from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

from database import Base, engine, SessionLocal
from agent.graph import app_graph
from fastapi.middleware.cors import CORSMiddleware
from models.interaction import Interaction

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


class ChatRequest(BaseModel):
    message: str


# ---------------- GUARDRAILS ---------------- #
def validate_input(user_input: str):
    blocked_keywords = ["delete all", "drop database", "remove everything", "wipe data"]

    for keyword in blocked_keywords:
        if keyword in user_input.lower():
            return False, "❌ This action is not allowed."

    return True, None


def check_sensitive_action(user_input: str):
    sensitive_words = ["delete", "remove"]

    for word in sensitive_words:
        if word in user_input.lower():
            return True
    return False


@app.get("/interactions")
def get_interactions():
    db = SessionLocal()
    data = db.query(Interaction).all()
    db.close()

    return [
        {
            "hcp_name": i.hcp_name,
            "topic": i.topic,
            "sentiment": i.sentiment,
            "date": i.date,
            "time": i.time,
        }
        for i in data
    ]


@app.post("/chat")
async def chat(request: ChatRequest):
    db = SessionLocal()

    try:
        print("user:", request.message)

        is_valid, error = validate_input(request.message)
        if not is_valid:
            return {"response": error}

        if check_sensitive_action(request.message):
            return {
                "response": "⚠️ This action requires human confirmation. Please contact support."
            }

        result = app_graph.invoke({"text": request.message})

        raw = result.get("result")

        print("RAW AI OUTPUT:", raw)

        # ✅ Ensure it's a dictionary
        if isinstance(raw, dict):
            # If the output comes from a tool like log_interaction, it might be nested under "data"
            data = (
                raw.get("data")
                if "data" in raw and isinstance(raw["data"], dict)
                else raw
            )
        else:
            data = {}

        now = datetime.now()

        clean_data = {
            "hcp_name": data.get("hcp_name"),
            "topic": data.get("topic"),
            "sentiment": data.get("sentiment", "neutral"),
            "date": now.strftime("%Y-%m-%d"),
            "time": now.strftime("%H:%M:%S"),
        }

        print("Clean Data:", clean_data)

        if clean_data.get("hcp_name") and clean_data.get("topic"):
            new_interaction = Interaction(
                hcp_name=clean_data["hcp_name"],
                topic=clean_data["topic"],
                sentiment=clean_data["sentiment"],
                date=clean_data["date"],
                time=clean_data["time"],
            )

            db.add(new_interaction)
            db.commit()
            print("Data added to database", clean_data)
        else:
            print("Data not added to database")

        return {"response": clean_data}

    except Exception as e:
        db.rollback()
        print("🔥 ERROR:", str(e))
        return {"error": str(e)}

    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}
