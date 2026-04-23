from fastapi import FastAPI
from pydantic import BaseModel

from database import Base, engine
from agent.graph import app_graph
from fastapi.middleware.cors import CORSMiddleware

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
    sensitive_words = ["delete", "remove", "update"]

    for word in sensitive_words:
        if word in user_input.lower():
            return True
    return False


@app.post("/chat")
async def chat(request: ChatRequest):

    try:
        is_valid, error = validate_input(request.message)

        print("User:", request.message)
        if not is_valid:
            return {"response": error}

        if check_sensitive_action(request.message):
            return {
                "response": "⚠️ This action requires human confirmation. Please contact support."
            }

        result = app_graph.invoke({"text": request.message})
        print("Response:", result)
        return {"response": result["result"]}
    except Exception as e:
        return {"error": str(e)}


@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}
