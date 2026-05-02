import json
import re

from langchain.tools import tool
from database import SessionLocal
from models.interaction import Interaction
from agent.llm import llm

@tool
def log_interaction(text: str):
    """
    Extract interaction details from natural language and store them in the CRM database.
    """
    
    prompt = f"""
Extract the following fields from the interaction text.

hcp_name
topic
sentiment

Text:
{text}

Return JSON.
"""

    response = llm.invoke(prompt)
    content = getattr(response, "content", None)

    if not content:
        return {"error": "LLM response returned no content."}

    content = content.replace("```json", "").replace("```", "").strip()
    match = re.search(r"\{.*\}", content, re.DOTALL)

    if not match:
        return {"error": "Could not find JSON in AI response."}

    try:
        data = json.loads(match.group())
    except json.JSONDecodeError:
        return {"error": "Failed to parse JSON from AI response."}

    return {"status": "stored", "data": data}


@tool
def edit_interaction(text: str):
    """
    Update the sentiment of the latest interaction based on user instruction.
    Example: Change sentiment to positive.
    """

    db = SessionLocal()

    try:

        interaction = (
            db.query(Interaction)
            .order_by(Interaction.id.desc())
            .first()
        )

        if not interaction:
            return {"error": "No interaction found"}

        text = text.lower()

        if "positive" in text:
            interaction.sentiment = "positive"

        elif "negative" in text:
            interaction.sentiment = "negative"

        elif "neutral" in text:
            interaction.sentiment = "neutral"

        else:
            return {"error": "No sentiment detected"}

        db.commit()

        return {
            "status": "updated",
            "sentiment": interaction.sentiment
        }

    finally:
        db.close()

@tool
def get_interaction_history(text: str):
    """
    Return the list of stored interactions from the CRM database.
    """

    db = SessionLocal()

    try:

        interactions = db.query(Interaction).all()

        results = []

        for i in interactions:

            results.append({
                "id": i.id,
                "hcp_name": i.hcp_name,
                "topic": i.topic,
                "sentiment": i.sentiment
            })

        return {"history": results}

    finally:
        db.close()


@tool
def summarize_interaction(text: str):
    """
    Generate a short summary of the latest interaction.
    """

    db = SessionLocal()

    try:

        interaction = (
            db.query(Interaction)
            .order_by(Interaction.id.desc())
            .first()
        )

        if not interaction:
            return {"error": "No interaction found"}

        prompt = f"""
Summarize this interaction in 2 sentences.

Doctor: {interaction.hcp_name}
Topic: {interaction.topic}
Sentiment: {interaction.sentiment}
"""

        response = llm.invoke(prompt)

        return {"summary": response.content}

    finally:
        db.close()



@tool
def suggest_followup(text: str):
    """
    Suggest the next follow-up action for the doctor interaction.
    """

    db = SessionLocal()

    try:

        interaction = (
            db.query(Interaction)
            .order_by(Interaction.id.desc())
            .first()
        )

        if not interaction:
            return {"message": "No interactions found"}

        prompt = f"""
Suggest a follow-up action for this doctor interaction.

Doctor: {interaction.hcp_name}
Topic: {interaction.topic}
"""

        response = llm.invoke(prompt)

        return {"followup": response.content}

    finally:
        db.close()

