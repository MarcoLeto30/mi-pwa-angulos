import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Trophy, RefreshCw, Home } from 'lucide-react';
import Confetti from 'react-confetti'; // We might not have installed this, so I'll skip it or use a simple CSS animation instead to avoid missing dependency errors. I'll stick to CSS.

export default function Results() {
    const location = useLocation();
    const result = location.state || { score: 0, totalQuestions: 0 };
    const percentage = Math.round((result.score / result.totalQuestions) * 100) || 0;

    let message = "¡Sigue practicando!";
    let color = "text-gray-600";

    if (percentage === 100) {
        message = "¡Perfecto! Eres un maestro.";
        color = "text-yellow-500";
    } else if (percentage >= 80) {
        message = "¡Excelente trabajo!";
        color = "text-green-500";
    } else if (percentage >= 60) {
        message = "¡Bien hecho!";
        color = "text-blue-500";
    }

    return (
        <div className="p-6 max-w-md mx-auto h-full flex flex-col items-center justify-center text-center">
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-yellow-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <Trophy size={80} className="text-yellow-500 relative z-10" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resultados</h1>
            <p className={`text-lg font-medium mb-8 ${color}`}>{message}</p>

            <div className="w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div className="text-5xl font-black text-gray-900 mb-2">
                    {result.score}<span className="text-2xl text-gray-400 font-normal">/{result.totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{percentage}% Correcto</p>
            </div>

            <div className="flex flex-col w-full gap-3">
                <Link
                    to="/quiz"
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                    <RefreshCw size={20} />
                    Intentar de nuevo
                </Link>
                <Link
                    to="/"
                    className="w-full py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-gray-50"
                >
                    <Home size={20} />
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
