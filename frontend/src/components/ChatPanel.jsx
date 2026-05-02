import React, { useState } from "react";
import axios from "axios";

function ChatPanel({ setInteractionData, setInteractions }) {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message) return;

        setLoading(true);

        const userMsg = { sender: "User", text: message };
        setChat(prev => [...prev, userMsg]);

        try {
            const res = await axios.post(
                "http://localhost:8000/chat",
                { message }
            );

            setMessage("");

            const data = res.data;

            console.log("FINAL DATA:", data);

            let text = "";

            if (data.type === "log" && data.data) {
                const logData = data.data;
                setInteractionData(logData);
                setInteractions(prev => [...prev, logData]);

                text = `Interaction logged for ${logData.hcp_name}. Topic: ${logData.topic}. Sentiment: ${logData.sentiment}.`;
            } else if (data.type === "message" || data.type === "error") {
                text = data.text;
            } else {
                text = JSON.stringify(data);
            }

            const aiMsg = {
                sender: "AI",
                text: text
            };

            setChat(prev => [...prev, aiMsg]);

        } catch (error) {
            console.log("❌ ERROR:", error.response?.data || error.message);

            const errMsg = {
                sender: "AI",
                text: "Error: " + (error.response?.data?.error || "Server issue")
            };

            setChat(prev => [...prev, errMsg]);
        }

        setLoading(false);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow h-[500px] flex flex-col">

            <h2 className="text-lg font-semibold mb-2">🤖 AI Assistant</h2>
            <p className="text-sm text-gray-500 mb-2">
                Log interaction details via chat
            </p>

            <div className="h-80 overflow-y-auto border rounded p-3 bg-gray-50">

                {chat.map((m, i) => (
                    <div
                        key={i}
                        className={`mb-2 flex ${m.sender === "User" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-3 py-2 rounded-lg max-w-xs ${m.sender === "User"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-black"
                                }`}
                        >
                            {m.text}
                        </div>
                    </div>
                ))}

            </div>

            {loading && <p className="text-sm">AI is thinking...</p>}

            <div className="flex mt-3 gap-2">

                <input
                    className="flex-1 border rounded px-3 py-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe interaction..."
                />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={sendMessage}
                >
                    Send
                </button>

            </div>

        </div>
    );
}

export default ChatPanel;