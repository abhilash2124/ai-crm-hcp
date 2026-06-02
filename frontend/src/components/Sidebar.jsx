import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, MessageSquare, Users, LineChart, X } from "lucide-react";

function Sidebar({ isOpen, onClose }) {
    const location = useLocation();

    const menuItems = [
        { path: "/", label: "Dashboard", Icon: LayoutDashboard },
        { path: "/interactions", label: "Interactions", Icon: MessageSquare },
        { path: "/doctors", label: "Doctors", Icon: Users },
        { path: "/analytics", label: "Analytics", Icon: LineChart }
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar drawer container */}
            <div className={`
                fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-6 z-50 transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:w-64 lg:min-h-screen lg:z-auto
            `}>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="bg-blue-600 w-3 h-3 rounded-full animate-pulse"></span>
                        AI CRM
                    </h1>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none"
                        aria-label="Close Sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            const IconComponent = item.Icon;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        <IconComponent size={18} />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mt-auto border-t border-gray-800 pt-4 text-xs text-gray-500">
                    <p>© 2026 AI CRM Platform</p>
                </div>
            </div>
        </>
    );
}

export default Sidebar;