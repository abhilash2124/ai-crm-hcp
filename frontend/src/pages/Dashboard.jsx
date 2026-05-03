import InteractionForm from "../components/InteractionForm";
import ChatAssistant from "../components/ChatPanel";
import StatsCards from "../components/StatsCards";
import InteractionHistory from "../components/InteractionHistory";
import AnalyticsCharts from "../components/AnalyticsCharts";

export default function Dashboard({
    interactionData = {},
    setInteractionData = () => { },
    interactions = [],
    setInteractions = () => { },
}) {
    return (
        <div className="p-6">

            <StatsCards interactions={interactions} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <InteractionForm data={interactionData} />
                <ChatAssistant
                    setInteractionData={setInteractionData}
                    setInteractions={setInteractions}
                />
            </div>

            <div className="grid grid-cols-1 gap-6">
                <AnalyticsCharts interactions={interactions} />
                <InteractionHistory data={interactions} />
            </div>
        </div>
    );
}