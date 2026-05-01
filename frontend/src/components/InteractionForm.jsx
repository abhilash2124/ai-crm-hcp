function InteractionForm({ data }) {
  console.log(data)
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">HCP Name</label>
        <input
          className="w-full border rounded-lg p-2 bg-gray-100"
          value={data.hcp_name}
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Topics Discussed</label>
        <input
          className="w-full border p-2 rounded"
          value={data.topic}
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Observed HCP Sentiment
        </label>

        <div className="flex gap-4">
          <label>
            <input type="radio" checked={data.sentiment === "positive"} readOnly /> Positive
          </label>
          <label>
            <input type="radio" checked={data.sentiment === "neutral"} readOnly /> Neutral
          </label>
          <label>
            <input type="radio" checked={data.sentiment === "negative"} readOnly /> Negative
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input type="date" value={data.date || ""} readOnly />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Time</label>
        <input type="time" value={data.time || ""} readOnly />
      </div>
    </div>
  );
}


export default InteractionForm;