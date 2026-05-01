import React from "react";

function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-white p-5">
            <h1 className="text-xl font-bold mb-6">AI CRM</h1>
            <ul className="space-y-3">
                <li>Dashboard</li>
                <li>Interactions</li>
                <li>Analytics</li>
            </ul>
        </div>
    );
}

export default Sidebar;