import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BrainCircuit, History, Compass } from 'lucide-react';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={clsx(
                "flex flex-col items-center justify-center w-full py-2 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
            )}
        >
            <Icon size={24} className="mb-1" />
            <span>{label}</span>
        </Link>
    );
};

export default function Layout() {
    return (
        <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
            <main className="flex-1 overflow-y-auto pb-20">
                <Outlet />
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-pb">
                <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                    <NavItem to="/" icon={Home} label="Inicio" />
                    <NavItem to="/lessons" icon={BookOpen} label="Lecciones" />
                    <NavItem to="/quiz" icon={BrainCircuit} label="Práctica" />
                    <NavItem to="/history" icon={History} label="Historial" />
                    <NavItem to="/sensor" icon={Compass} label="Sensor" />
                </div>
            </nav>
        </div>
    );
}
