import React, { useState } from "react";
import axios from "axios";

function ChatPanel({ setInteractionData, setInteractions }) {
    const [message, setMessage] = useState("");
    // const [chat, setChat] = useState([]);
    const [chat, setChat] = useState([
        {
            sender: "Ai",
            text: "Hi 👋 I can help you log HCP interactions.\nTry something like:\n'I met Dr Raju and discussed insulin and he was positive.'"
        }
    ]);
    const [loading, setLoading] = useState(false);

    const normalizeSentiment = (item) => {
        if (!item || typeof item !== "object") return item;
        const sentiment = typeof item.sentiment === "string"
            ? item.sentiment.trim().toLowerCase()
            : item.sentiment;
        return { ...item, sentiment };
    };

    // const API_URL = import.meta.env.VITE_API_URL;
    const API_URL = process.env.REACT_APP_API_URL || "https://ai-crm-hcp-pkzn.onrender.com";

    const sendMessage = async () => {
        if (!message) return;

        setLoading(true);

        const userMsg = { sender: "User", text: message };
        setChat(prev => [...prev, userMsg]);

        try {

            const res = await axios.post(
                `${API_URL}/chat`,
                { message }
            );

            setMessage("");

            const response = res.data;

            console.log("FINAL DATA:", response);

            let text = "";

            if (response && response.hcp_name) {
                const normalized = normalizeSentiment(response);
                setInteractionData(normalized);
                setInteractions(prev => [...prev, normalized]);

                text = `Interaction logged for ${normalized.hcp_name || "HCP"}`;
            } else if (response && response.type === "log" && response.data) {
                const normalized = normalizeSentiment(response.data);
                setInteractionData(normalized);
                setInteractions(prev => [...prev, normalized]);

                text = `Interaction logged for ${normalized.hcp_name || "HCP"}`;
            } else if (response && (response.type === "message" || response.type === "error")) {
                text = response.text;
            } else {
                text = response?.text ?? JSON.stringify(response);
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

    const suggestions = [
        "I met Dr Raju and discussed insulin",
        "Met Dr Abhi about cardiology drug and he was positive",
        "Show my interaction history",
        "Give summary of interactions",
        "I met Dr Meena and discussed diabetes and she was negative",
        "Give follow-up suggestions based on recent interactions"
    ];

    return (
        <div className="bg-white p-4 rounded-xl shadow min-h-[300px] flex flex-col">

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
                            className={`px-4 py-2 rounded-lg max-w-xs text-sm ${m.sender === "User"
                                ? "bg-blue-500 text-white ml-auto"
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
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your interaction..."
                />

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
                {suggestions.map((s, i) => (
                    <button
                        key={i}
                        // onClick={() => setMessage(s)}
                        onClick={() => {
                            setMessage(s);
                            setTimeout(() => sendMessage(), 200);
                        }}
                        className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                        {s}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default ChatPanel;