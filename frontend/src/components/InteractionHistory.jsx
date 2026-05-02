import React from "react";

function InteractionHistory({ data = [] }) {
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="border-b">
                    <th>Name</th>
                    <th>Topic</th>
                    <th>Sentiment</th>
                    <th>Timestamp</th>
                </tr>
            </thead>

            <tbody>
                {data.map((d, i) => (
                    <tr key={i} className="border-b">
                        <td>{d.hcp_name}</td>
                        <td>{d.topic}</td>
                        <td>{d.sentiment}</td>
                        <td>{d.timestamp || `${d.date || ""} ${d.time || ""}`.trim() || "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default InteractionHistory;