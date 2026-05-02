import InteractionForm from "../components/InteractionForm";
import ChatAssistant from "../components/ChatPanel";
import StatsCards from "../components/StatsCards";
import InteractionHistory from "../components/InteractionHistory";

export default function Dashboard({
    interactionData = {},
    setInteractionData = () => {},
    interactions = [],
    setInteractions = () => {},
}) {
    return (
        <div className="p-6">

            <StatsCards />

            <div className="grid grid-cols-2 gap-6">
                <InteractionForm data={interactionData} />
                <ChatAssistant
                    setInteractionData={setInteractionData}
                    setInteractions={setInteractions}
                />
            </div>

            <InteractionHistory data={interactions} />
        </div>
    );
}