from fastapi import FastAPI, Depends
from pydantic import BaseModel
from datetime import datetime
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from agent.graph import app_graph
from fastapi.middleware.cors import CORSMiddleware
from models.interaction import Interaction

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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
def get_interactions(db: Session = Depends(get_db)):
    data = db.query(Interaction).all()

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
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        print("user:", request.message)

        is_valid, error = validate_input(request.message)
        if not is_valid:
            return {"type": "error", "text": error}

        if check_sensitive_action(request.message):
            return {
                "type": "error",
                "text": "⚠️ This action requires human confirmation. Please contact support."
            }

        result = app_graph.invoke({"text": request.message})

        raw = result.get("result")

        print("RAW AI OUTPUT:", raw)

        if isinstance(raw, dict):
            if "data" in raw:
                # Log Interaction
                data = raw["data"]
                now = datetime.now()
                sentiment = data.get("sentiment", "neutral")
                if isinstance(sentiment, str):
                    sentiment = sentiment.strip().lower()
                if sentiment not in ("positive", "negative", "neutral"):
                    sentiment = "neutral"

                clean_data = {
                    "hcp_name": data.get("hcp_name"),
                    "topic": data.get("topic"),
                    "sentiment": sentiment,
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
                    return {"type": "log", "data": clean_data}
                else:
                    return {"type": "error", "text": "Could not extract HCP name and topic."}
                    
            elif "summary" in raw:
                return {"type": "message", "text": raw["summary"]}
                
            elif "history" in raw:
                history_list = raw["history"]
                if not history_list:
                    return {"type": "message", "text": "No interaction history found."}
                
                formatted = "Interaction History:\n"
                for i in history_list:
                    formatted += f"- {i.get('hcp_name')} | {i.get('topic')} | {i.get('sentiment')}\n"
                return {"type": "message", "text": formatted.strip()}
                
            elif "followup" in raw:
                return {"type": "message", "text": raw["followup"]}
                
            elif "message" in raw:
                return {"type": "message", "text": raw["message"]}
                
            elif "status" in raw and raw["status"] == "updated":
                return {"type": "message", "text": f"Interaction sentiment updated to: {raw['sentiment']}"}
                
            elif "error" in raw:
                return {"type": "error", "text": raw["error"]}
                
        # Fallback
        return {"type": "message", "text": str(raw)}

    except Exception as e:
        db.rollback()
        print("🔥 ERROR:", str(e))
        return {"type": "message", "text": "Something went wrong"}


@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}
