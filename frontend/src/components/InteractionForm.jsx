// import React from "react";

function InteractionForm({ data }) {
  return (
    <div className="form-card">
      <h2>Log HCP Interaction</h2>

      <div className="form-group">
        <label>HCP Name</label>
        <input value={data.hcp_name} readOnly />
      </div>

      <div className="form-group">
        <label>Topics Discussed</label>
        <input value={data.topic} readOnly />
      </div>

      <div className="form-group">
        <label>Observed HCP Sentiment</label>

        <div className="sentiment">

          <label>
            <input type="radio" checked={data.sentiment === "positive"} readOnly />
            Positive
          </label>

          <label>
            <input type="radio" checked={data.sentiment === "neutral"} readOnly />
            Neutral
          </label>

          <label>
            <input type="radio" checked={data.sentiment === "negative"} readOnly />
            Negative
          </label>

        </div>
        <label>Date</label>
        <input type="date" value={data.date || ""} readOnly />

        <label>Time</label>
        <input type="time" value={data.time || ""} readOnly />
      </div>
    </div>
  );
}

export default InteractionForm;