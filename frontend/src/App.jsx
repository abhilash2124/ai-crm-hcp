import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Interactions from "./pages/Interactions";
import Analytics from "./pages/Analytics";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

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
        const res = await axios.get(`${API_URL}/interactions`);
        setInteractions(res.data);
      } catch (error) {
        console.error("Error fetching interactions", error);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6">
        <Topbar />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                interactionData={interactionData}
                setInteractionData={setInteractionData}
                interactions={interactions}
                setInteractions={setInteractions}
              />
            }
          />
          <Route
            path="/interactions"
            element={<Interactions interactions={interactions} />}
          />
          <Route
            path="/analytics"
            element={<Analytics interactions={interactions} />}
          />
          <Route
            path="*"
            element={
              <Dashboard
                interactionData={interactionData}
                setInteractionData={setInteractionData}
                interactions={interactions}
                setInteractions={setInteractions}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;