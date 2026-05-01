export default function StatsCards({ interactions }) {
    return (
        <div className="grid grid-cols-3 gap-6 mb-6">

            <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500 text-sm">Total Interactions</p>
                <p className="text-3xl font-bold">{interactions.length}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-sm text-gray-500">Positive Sentiment</h3>
                <p className="text-2xl font-bold text-green-500">
                    {interactions.filter(i => i.sentiment === "positive").length}
                </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-sm text-gray-500">Negative Sentiment</h3>
                <p className="text-2xl font-bold text-red-500">
                    {interactions.filter(i => i.sentiment === "negative").length}
                </p>
            </div>

        </div>
    );
}