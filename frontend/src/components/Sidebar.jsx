import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="hidden lg:flex flex-col w-64 bg-gray-900 text-white p-6">
            <h1 className="text-xl font-bold mb-6">AI CRM</h1>
            <ul className="space-y-3">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/interactions">Interactions</Link></li>
                <li><Link to="/analytics">Analytics</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;