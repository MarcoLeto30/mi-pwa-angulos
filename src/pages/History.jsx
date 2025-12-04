import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/db';
import { Calendar, CheckCircle2 } from 'lucide-react';

export default function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const data = await getHistory();
        // Sort by date desc
        setHistory(data.sort((a, b) => b.date - a.date));
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Tu Progreso</h1>

            {history.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>Aún no has realizado ninguna práctica.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                                    <Calendar size={12} />
                                    <span>{new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="font-bold text-gray-800">
                                    Práctica General
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <div className="text-lg font-black text-primary">
                                        {item.score}/{item.totalQuestions}
                                    </div>
                                    <div className="text-xs text-gray-400">Puntos</div>
                                </div>
                                {item.score === item.totalQuestions && (
                                    <CheckCircle2 className="text-green-500" size={24} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
