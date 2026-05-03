export default function StatsCards({ interactions = [] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">

            <div className="bg-blue-500 text-white p-5 rounded-xl shadow">
                <h3 className="text-sm">Total Interactions</h3>
                <p className="text-3xl font-bold">{interactions.length}</p>
            </div>

            <div className="bg-green-500 text-white p-5 rounded-xl shadow">
                <h3 className="text-sm">Positive</h3>
                <p className="text-3xl font-bold">
                    {interactions.filter(i => i.sentiment === "positive").length}
                </p>
            </div>

            <div className="bg-red-500 text-white p-5 rounded-xl shadow">
                <h3 className="text-sm">Negative</h3>
                <p className="text-3xl font-bold">
                    {interactions.filter(i => i.sentiment === "negative").length}
                </p>
            </div>

        </div>
    );
}