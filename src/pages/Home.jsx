import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BrainCircuit } from 'lucide-react';
import InstallButton from '../components/InstallButton';

export default function Home() {
    return (
        <div className="p-6 max-w-md mx-auto space-y-8">
            <header className="text-center mt-8">
                <h1 className="text-4xl font-bold text-primary mb-2">Ángulos</h1>
                <p className="text-gray-600">Domina las unidades de medida</p>
            </header>

            <div className="grid gap-4">
                <Link to="/lessons" className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen size={64} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Lecciones</h2>
                    <p className="text-sm text-gray-500">Aprende sobre Grados, Radianes y Vueltas con ejemplos visuales.</p>
                    <div className="mt-4 inline-flex items-center text-primary font-semibold text-sm">
                        Comenzar &rarr;
                    </div>
                </Link>

                <Link to="/quiz" className="group relative overflow-hidden bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-indigo-100">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <BrainCircuit size={64} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Práctica Interactiva</h2>
                    <p className="text-sm text-gray-700">Ponte a prueba con ejercicios aleatorios y gana experiencia.</p>
                    <div className="mt-4 inline-flex items-center bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-black hover:bg-gray-50 transition-colors">
                        Practicar ahora
                    </div>
                </Link>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-1">¿Sabías que?</h3>
                <p className="text-sm text-blue-600">
                    Una vuelta completa son 2π radianes, lo que equivale aproximadamente a 6.283 radianes.
                </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Configuración</h3>
                <button
                    onClick={() => {
                        if (!("Notification" in window)) {
                            alert("Este navegador no soporta notificaciones de escritorio");
                        } else {
                            Notification.requestPermission().then(permission => {
                                if (permission === 'granted') {
                                    new Notification('¡Ángulos PWA!', {
                                        body: 'Gracias por activar las notificaciones. Te recordaremos practicar.',
                                        icon: '/pwa-192x192.png'
                                    });
                                } else {
                                    alert('Permiso de notificaciones denegado.');
                                }
                            });
                        }
                    }}
                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                >
                    Activar Notificaciones
                </button>
            </div>

            <InstallButton />
        </div>
    );
}
