import React from "react";

function Topbar() {
    return (
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p className="text-gray-500">Welcome, Abhilash</p>
        </div>
    );
}

export default Topbar;