import {
    ResponsiveContainer,
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

function AnalyticsCharts({ interactions }) {

    // ✅ Sentiment Data
    const sentimentData = [
        {
            name: "Positive",
            value: interactions.filter(i => i.sentiment?.toLowerCase() === "positive").length
        },
        {
            name: "Neutral",
            value: interactions.filter(i => i.sentiment?.toLowerCase() === "neutral").length
        },
        {
            name: "Negative",
            value: interactions.filter(i => i.sentiment?.toLowerCase() === "negative").length
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Sentiment Pie */}
            <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
                <h3 className="mb-3 font-semibold self-start">Sentiment Distribution</h3>
                <div className="w-full h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 0, right: 0, bottom: 5, left: 0 }}>
                            <Pie
                                data={sentimentData}
                                dataKey="value"
                                cx="50%"
                                cy="45%"
                                outerRadius={75}
                            >
                                {sentimentData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Topic Bar */}
            <div className="bg-white p-3 rounded-xl shadow">
                <h3 className="mb-3 font-semibold">Topics Discussed</h3>
                <div className="w-full h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topicData} margin={{ top: 5, right: 10, bottom: 5, left: -25 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="topic" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

export default AnalyticsCharts;