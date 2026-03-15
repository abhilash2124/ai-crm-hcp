# AI-First CRM HCP Module

This project is an **AI-powered CRM module** designed for pharmaceutical field representatives to log interactions with Healthcare Professionals (HCPs) using **natural language input**.

Instead of manually filling CRM fields, the user can simply describe an interaction. The AI assistant automatically extracts structured data and stores it in the CRM database.

---

## Tech Stack

### Frontend

* React
* Axios
* Google Inter Font

### Backend

* Python
* FastAPI

### AI Agent Framework

* LangGraph

### LLM

* Groq API
* Model: `llama-3.3-70b-versatile`

### Database

* SQLite used for development.
System can easily migrate to PostgreSQL.
For local testing SQLite is used. The schema is compatible with PostgreSQL
for production deployment.

---

## System Architecture

User → React Frontend → FastAPI `/chat` API → LangGraph Agent → Tool Execution → LLM Extraction → Database → Response to Frontend

The AI agent determines which tool to execute based on the user's natural language request.

---

## LangGraph Tools

### 1. Log Interaction

Extracts HCP name, topic, and sentiment from natural language input and stores the interaction in the database.

### 2. Edit Interaction

Updates previously logged interaction fields using natural language commands.

Example:

Change sentiment to positive

### 3. Get Interaction History

Retrieves past interactions with a healthcare professional.

### 4. Summarize Interaction

Generates a summary of previous interactions.

### 5. Suggest Follow-up

Provides recommended next actions for the field representative.

---

## Frontend Features

* Split layout UI (Interaction Form + AI Assistant)
* AI-driven form population
* Chat interface for logging interactions
* Sentiment detection
* Interaction history retrieval

---

## Running the Project

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## Example Commands

```
Met Dr Kumar and discussed insulin
```

```
Change sentiment to positive
```

```
Show interactions with Dr Kumar
```

---

## Author

Abhilash Addagatla
