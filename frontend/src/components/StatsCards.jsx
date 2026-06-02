export default function StatsCards({ interactions = [] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">

            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg border border-indigo-400/20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                <h3 className="text-sm font-semibold tracking-wide uppercase opacity-90 flex items-center gap-2">
                    <span>📊</span> Total Interactions
                </h3>
                <p className="text-4xl font-extrabold mt-2 tracking-tight">{interactions.length}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg border border-emerald-400/20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                <h3 className="text-sm font-semibold tracking-wide uppercase opacity-90 flex items-center gap-2">
                    <span>🟢</span> Positive
                </h3>
                <p className="text-4xl font-extrabold mt-2 tracking-tight">
                    {interactions.filter(i => i.sentiment === "positive").length}
                </p>
            </div>

            <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white p-6 rounded-2xl shadow-lg border border-rose-400/20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                <h3 className="text-sm font-semibold tracking-wide uppercase opacity-90 flex items-center gap-2">
                    <span>🔴</span> Negative
                </h3>
                <p className="text-4xl font-extrabold mt-2 tracking-tight">
                    {interactions.filter(i => i.sentiment === "negative").length}
                </p>
            </div>

        </div>
    );
}