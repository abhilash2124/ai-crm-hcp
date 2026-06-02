export default function DoctorIntelligenceCard({
    interactionData,
    interactions = [],
}) {
    if (!interactionData?.hcp_name) {
        return (
            <div className="bg-white p-5 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-3">
                    🧠 Doctor Intelligence
                </h2>

                <p className="text-gray-500">
                    Log an interaction to view doctor insights.
                </p>
            </div>
        );
    }

    const doctorHistory = interactions.filter(
        (item) => item.hcp_name === interactionData.hcp_name
    );

    const positiveCount = doctorHistory.filter(
        (item) => item.sentiment === "positive"
    ).length;

    const negativeCount = doctorHistory.filter(
        (item) => item.sentiment === "negative"
    ).length;

    const neutralCount = doctorHistory.filter(
        (item) => item.sentiment === "neutral"
    ).length;

    const latestInteraction = doctorHistory[doctorHistory.length - 1];

    // Topic frequency calculation
    const topicCounts = {};

    doctorHistory.forEach((item) => {
        topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1;
    });

    let mostDiscussedTopic = "N/A";
    let highestCount = 0;

    for (const topic in topicCounts) {
        if (topicCounts[topic] > highestCount) {
            highestCount = topicCounts[topic];
            mostDiscussedTopic = topic;
        }
    }

    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
                Doctor Insights
            </h2>

            <div className="space-y-2">
                <p>
                    <strong>Doctor:</strong> {interactionData.hcp_name}
                </p>

                <p>
                    <strong>Total Meetings:</strong> {doctorHistory.length}
                </p>

                <p>
                    <strong>🟢 Positive:</strong> {positiveCount}
                </p>

                <p>
                    <strong>🟡 Neutral:</strong> {neutralCount}
                </p>

                <p>
                    <strong>🔴 Negative:</strong> {negativeCount}
                </p>

                <p>
                    <strong>Most Discussed Topic:</strong>{" "}
                    {mostDiscussedTopic}
                </p>

                {latestInteraction && (
                    <p>
                        <strong>Last Interaction:</strong>{" "}
                        {latestInteraction.date}
                    </p>
                )}
            </div>
        </div>
    );
}


// export default function DoctorHistoryCard({
//     interactionData,
//     interactions = [],
// }) {
//     console.log("In DoctorHistoryCard");
//     console.log("Interaction Data:", interactionData);
//     console.log("Interactions:", interactions);

//     if (!interactionData?.hcp_name) {
//         return (
//             <div className="bg-white p-4 rounded-xl shadow">
//                 <h2 className="text-lg font-semibold mb-3">
//                     Doctor History
//                 </h2>

//                 <p className="text-gray-500">
//                     No doctor selected yet.
//                 </p>
//             </div>
//         );
//     }

//     const doctorHistory = interactions.filter(
//         (item) => item.hcp_name === interactionData.hcp_name
//     );

//     const positiveCount = doctorHistory.filter(
//         (i) => i.sentiment === "positive"
//     ).length;

//     const neutralCount = doctorHistory.filter(
//         (i) => i.sentiment === "neutral"
//     ).length;

//     const negativeCount = doctorHistory.filter(
//         (i) => i.sentiment === "negative"
//     ).length;

//     const topicCounts = {};

//     doctorHistory.forEach((item) => {
//         topicCounts[item.topic] =
//             (topicCounts[item.topic] || 0) + 1;
//     });

//     const mostDiscussedTopic =
//         Object.keys(topicCounts).length > 0
//             ? Object.keys(topicCounts).reduce((a, b) =>
//                 topicCounts[a] > topicCounts[b] ? a : b
//             )
//             : "N/A";

//     return (
//         <div className="bg-white p-4 rounded-xl shadow">
//             <h2 className="text-lg font-semibold mb-3">
//                 Doctor History
//             </h2>

//             <p>
//                 <strong>Doctor:</strong> {interactionData.hcp_name}
//             </p>

//             <p>
//                 <strong>Total Interactions:</strong>{" "}
//                 {doctorHistory.length}
//             </p>

//             <div className="mt-4">
//                 <h3 className="font-medium mb-2">
//                     Recent Interactions
//                 </h3>

//                 <ul className="space-y-2">
//                     {doctorHistory
//                         .slice()
//                         .reverse()
//                         .slice(0, 5)
//                         .map((item, index) => (
//                             <li
//                                 key={index}
//                                 className="border rounded p-2 text-sm"
//                             >
//                                 <div>
//                                     {item.topic}
//                                 </div>

//                                 <div className="text-gray-500">
//                                     {item.sentiment}
//                                 </div>
//                             </li>
//                         ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }