import React from "react";
import { useLocation } from "react-router-dom";

function Topbar({ onToggleSidebar }) {
    const location = useLocation();
    const pathTitles = {
        "/": "Dashboard",
        "/interactions": "Interactions",
        "/doctors": "Doctors",
        "/analytics": "Analytics",
    };

    return (
        <>
            <div className="lg:hidden flex items-center justify-between bg-white p-4 shadow mb-4 rounded-lg">
                <button
                    onClick={onToggleSidebar}
                    className="text-2xl p-1.5 -ml-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                    aria-label="Toggle Sidebar"
                >
                    ☰
                </button>
                <h1 className="font-semibold text-gray-800">AI CRM</h1>
                <div className="w-6"></div> {/* Spacer for symmetry */}
            </div>
            <div className="hidden lg:flex h-16 bg-white shadow items-center justify-between px-6 mb-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800">{pathTitles[location.pathname] || "AI CRM"}</h2>
                <p className="text-gray-500">Welcome, Abhilash</p>
            </div>
        </>
    );
}

export default Topbar;