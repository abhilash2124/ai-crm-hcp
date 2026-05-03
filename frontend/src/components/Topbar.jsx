import React from "react";
import { useLocation } from "react-router-dom";

function Topbar() {
    const location = useLocation();
    const pathTitles = {
        "/": "Dashboard",
        "/interactions": "Interactions",
        "/analytics": "Analytics",
    };

    return (
        <>
            <div className="lg:hidden flex items-center justify-between bg-white p-4 shadow">
                <button className="text-xl">☰</button>
                <h1 className="font-semibold">AI CRM</h1>
            </div>
            <div className="hidden lg:flex h-16 bg-white shadow items-center justify-between px-6">
                <h2 className="text-lg font-semibold">{pathTitles[location.pathname] || "AI CRM"}</h2>
                <p className="text-gray-500">Welcome, Abhilash</p>
            </div>
        </>
    );
}

export default Topbar;