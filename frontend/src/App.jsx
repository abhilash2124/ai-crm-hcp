import React, { useState } from "react";
import InteractionForm from "./components/InteractionForm";
import ChatAssistant from "./components/ChatAssistant";
import "./App.css";

function App() {

  const [interactionData, setInteractionData] = useState({
    hcp_name: "",
    topic: "",
    sentiment: ""
  });

  return (

    <div className="app-container">

      <div className="left-panel">
        <InteractionForm data={interactionData}/>
      </div>

      {console.log("Interaction State:", interactionData)}

      <div className="right-panel">
        <ChatAssistant setInteractionData={setInteractionData}/>
      </div>

    </div>

  );
}

export default App;