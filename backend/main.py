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

@app.post("/chat")
def chat(request: ChatRequest):

    try:
        result = app_graph.invoke({
            "text": request.message
        })

        return {"response": result["result"]}
    except Exception as e:
        return {"error": str(e)}

@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}