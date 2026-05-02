import React, { useState, useEffect } from "react";
import InteractionForm from "./components/InteractionForm";
import ChatPanel from "./components/ChatPanel";
import InteractionHistory from "./components/InteractionHistory";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import axios from "axios";
import AnalyticsCharts from "./components/AnalyticsCharts";


function App() {
  const [interactionData, setInteractionData] = useState({
    hcp_name: "",
    topic: "",
    sentiment: "",
    date: "",
    time: "",
  });

  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/interactions");
        setInteractions(res.data);
      } catch (error) {
        console.error("Error fetching interactions", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">

        <Topbar />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 my-6">

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Total Interactions</h3>
            <p className="text-2xl font-bold">{interactions.length}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Positive</h3>
            <p className="text-2xl font-bold text-green-500">
              {interactions.filter(i => i.sentiment?.toLowerCase() === "positive").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Negative</h3>
            <p className="text-2xl font-bold text-red-500">
              {interactions.filter(i => i.sentiment?.toLowerCase() === "negative").length}
            </p>
          </div>

        </div>

        {/* Main Section */}
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="mb-4 font-semibold text-lg">
              Log HCP Interaction
            </h2>
            <InteractionForm data={interactionData} />
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            {/* <h2 className="mb-4 font-semibold text-lg">
              🤖 AI Assistant
            </h2> */}
            <ChatPanel
              setInteractionData={setInteractionData}
              setInteractions={setInteractions}
            />
          </div>

        </div>

        {/* History */}
        <div className="bg-white p-5 rounded-xl shadow mt-6">
          <h2 className="mb-4 font-semibold text-lg">
            Interaction History
          </h2>
          <AnalyticsCharts interactions={interactions} />
        </div>
        <div className="bg-white p-5 rounded-xl shadow mt-6">
          <InteractionHistory data={interactions} />

        </div>

      </div>
    </div>
  );
}

export default App;