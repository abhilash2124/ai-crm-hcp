import InteractionHistory from "../components/InteractionHistory";

export default function Interactions({ interactions = [] }) {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Interactions</h1>
                    <p className="text-sm text-gray-500">Review all logged HCP interactions.</p>
                </div>
            </div>
            <InteractionHistory data={interactions} />
        </div>
    );
}
