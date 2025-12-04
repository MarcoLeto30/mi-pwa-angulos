import React, { useState, useEffect } from 'react';
import { Compass, Smartphone } from 'lucide-react';

export default function Sensor() {
    const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
    const [active, setActive] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const handleOrientation = (event) => {
        setOrientation({
            alpha: event.alpha ? event.alpha.toFixed(1) : 0,
            beta: event.beta ? event.beta.toFixed(1) : 0,
            gamma: event.gamma ? event.gamma.toFixed(1) : 0,
        });
    };

    const requestAccess = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    setPermissionGranted(true);
                    toggleSensor();
                } else {
                    alert('Permiso denegado');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // Non-iOS 13+ devices
            setPermissionGranted(true);
            toggleSensor();
        }
    };

    const toggleSensor = () => {
        if (active) {
            window.removeEventListener('deviceorientation', handleOrientation);
            setActive(false);
        } else {
            window.addEventListener('deviceorientation', handleOrientation);
            setActive(true);
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return (
        <div className="p-6 max-w-md mx-auto space-y-8">
            <header className="text-center mt-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Sensor de Orientación</h1>
                <p className="text-gray-600">Gira tu dispositivo para ver los valores</p>
            </header>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Compass size={120} />
                </div>

                <div className="grid grid-cols-1 gap-6 relative z-10">
                    <div className="p-4 bg-indigo-50 rounded-xl">
                        <div className="text-sm text-gray-500 mb-1">Alpha (Rotación Z)</div>
                        <div className="text-3xl font-black text-primary">{orientation.alpha}°</div>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-xl">
                        <div className="text-sm text-gray-500 mb-1">Beta (Inclinación X)</div>
                        <div className="text-3xl font-black text-secondary">{orientation.beta}°</div>
                    </div>
                    <div className="p-4 bg-violet-50 rounded-xl">
                        <div className="text-sm text-gray-500 mb-1">Gamma (Inclinación Y)</div>
                        <div className="text-3xl font-black text-accent">{orientation.gamma}°</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                {!permissionGranted && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function' ? (
                    <button
                        onClick={requestAccess}
                        className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95 transition-transform"
                    >
                        <Smartphone size={20} />
                        Permitir Acceso a Sensores
                    </button>
                ) : (
                    <button
                        onClick={toggleSensor}
                        className={`px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-all ${active
                                ? 'bg-red-500 text-white shadow-red-200'
                                : 'bg-green-500 text-white shadow-green-200'
                            }`}
                    >
                        <Smartphone size={20} />
                        {active ? 'Detener Sensor' : 'Iniciar Sensor'}
                    </button>
                )}
            </div>

            <div className="text-xs text-gray-400 text-center">
                Nota: Esta función requiere un dispositivo con giroscopio/acelerómetro.
            </div>
        </div>
    );
}
