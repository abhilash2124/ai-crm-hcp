import React, { useState } from "react";
import axios from "axios";

function ChatAssistant({ setInteractionData }) {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message) return;
    
    setLoading(true);

    const userMsg = { sender: "User", text: message };
    setChat([...chat, userMsg]);

    try {

      const res = await axios.post(
        "http://localhost:8000/chat",
        { message }
      );
      setMessage("");
      const response = res.data.response;
      console.log(response)

      // update form only if data exists
      if (response.data) {
        setInteractionData(response.data);
      }

      let text = "";

      if (response.data) {
        text = `Interaction logged for ${response.data.hcp_name}. Topic: ${response.data.topic}. Sentiment: ${response.data.sentiment}.`;
      }
      else if (response.sentiment) {
        text = `Sentiment updated to ${response.sentiment}.`;
      }
      else if (response.summary) {
        text = response.summary;
      }

      else if (response.followup) {
        text = response.followup;
      }
      else if (response.history) {

        text = response.history
          .map((h, i) =>
            `${i + 1}. ${h.hcp_name} - ${h.topic} - ${h.sentiment}`
          )
          .join("\n");

      }
      else {
        text = JSON.stringify(response);
      }

      const aiMsg = {
        sender: "Ai",
        text: text
      };

      setChat(prev => [...prev, aiMsg]);

    } catch (error) {

      const errMsg = {
        sender: "ai",
        text: "Error communicating with server."
      };

      setChat(prev => [...prev, errMsg]);

    }

    setMessage("");
    setLoading(false);
  };

  return (

    <div className="chat-container">

      <h2>🤖AI Assistant</h2>
      <p>Log Interaction details here via chat</p>

      <div className="chat-box">
        {chat.map((m, i) => (
          <p key={i} style={{ whiteSpace: "pre-line" }}>
            <b>{m.sender}:</b> {m.text}
          </p>
        ))}

      </div>

      <br />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe interaction..."
        style={{ width: "80%", padding: "6px" }}
      />

      {loading && <p>AI is thinking...</p>}

      <button
        onClick={sendMessage}
        disabled={loading}
        style={{ marginLeft: "10px", padding: "6px 12px" }}>
        {loading ? "Processing..." : "Log"}
      </button>

    </div>

  );
}

export default ChatAssistant;