import {
    PieChart, Pie, Cell, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

function AnalyticsCharts({ interactions }) {

    // ✅ Sentiment Data
    const sentimentData = [
        {
            name: "Positive",
            value: interactions.filter(i => i.sentiment === "positive").length
        },
        {
            name: "Neutral",
            value: interactions.filter(i => i.sentiment === "neutral").length
        },
        {
            name: "Negative",
            value: interactions.filter(i => i.sentiment === "negative").length
        }
    ];

    // ✅ Topic Count
    const topicMap = {};
    interactions.forEach(i => {
        topicMap[i.topic] = (topicMap[i.topic] || 0) + 1;
    });

    const topicData = Object.keys(topicMap).map(key => ({
        topic: key,
        count: topicMap[key]
    }));

    const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

    return (
        <div className="grid grid-cols-2 gap-6 mt-6">

            {/* Sentiment Pie */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="mb-3 font-semibold">Sentiment Distribution</h3>

                <PieChart width={300} height={250}>
                    <Pie
                        data={sentimentData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                    >
                        {sentimentData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

            {/* Topic Bar */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="mb-3 font-semibold">Topics Discussed</h3>

                <BarChart width={350} height={250} data={topicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
            </div>

        </div>
    );
}

export default AnalyticsCharts;