import AnalyticsCharts from "../components/AnalyticsCharts";

export default function Analytics({ interactions = [] }) {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Analytics</h1>
                    <p className="text-sm text-gray-500">Inspect sentiment and topic trends.</p>
                </div>
            </div>
            <AnalyticsCharts interactions={interactions} />
        </div>
    );
}
