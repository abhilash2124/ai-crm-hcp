import React from "react";

function InteractionHistory({ data = [] }) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                No interactions yet. Start by logging one.
            </div>
        );
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-left">
                    <tr>
                    <th className="p-3">HCP Name</th>
                    <th className="p-3">Topic</th>
                    <th className="p-3">Sentiment</th>
                    <th className="p-3">Date</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                        <td className="p-3">{item.hcp_name}</td>
                        <td className="p-3">{item.topic}</td>
                        <td className={`p-3 font-semibold ${item.sentiment === "positive" ? "text-green-600" :
                            item.sentiment === "negative" ? "text-red-600" :
                                "text-gray-600"
                            }`}>
                            {item.sentiment}
                        </td>
                        <td className="p-3">{item.date} {item.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default InteractionHistory;