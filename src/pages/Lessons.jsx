import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

const LessonCard = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
                <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </button>
            <div
                className={clsx(
                    "transition-all duration-300 ease-in-out overflow-hidden",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-50">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function Lessons() {
    const [angle, setAngle] = useState(90);

    const radians = (angle * (Math.PI / 180)).toFixed(2);
    const turns = (angle / 360).toFixed(2);

    return (
        <div className="p-6 max-w-md mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Lecciones</h1>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Visualizador</h2>

                <div className="relative w-48 h-48 mx-auto mb-6 bg-gray-50 rounded-full border-4 border-gray-100 flex items-center justify-center">
                    {/* Base line */}
                    <div className="absolute w-1/2 h-0.5 bg-gray-300 right-0 origin-left" style={{ left: '50%' }}></div>
                    {/* Rotating line */}
                    <div
                        className="absolute w-1/2 h-1 bg-primary origin-left rounded-full transition-transform duration-300"
                        style={{ left: '50%', transform: `rotate(-${angle}deg)` }}
                    ></div>
                    {/* Center point */}
                    <div className="absolute w-3 h-3 bg-gray-800 rounded-full z-10"></div>

                    {/* Arc */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'rotate(-90deg)' }}>
                        <circle
                            cx="50%" cy="50%" r="20%"
                            fill="none"
                            stroke="rgba(99, 102, 241, 0.2)"
                            strokeWidth="24"
                            strokeDasharray={`${(angle / 360) * 100 * Math.PI * 0.4}% 1000%`}
                        />
                    </svg>
                </div>

                <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="grid grid-cols-3 gap-2 mt-6 text-center">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-500">Grados</div>
                        <div className="font-bold text-primary">{angle}°</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-500">Radianes</div>
                        <div className="font-bold text-secondary">{radians} rad</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-500">Vueltas</div>
                        <div className="font-bold text-accent">{turns}</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <LessonCard title="Grados Sexagesimales">
                    <p className="mb-2">El grado sexagesimal es la unidad más común. Una vuelta completa se divide en <strong>360 grados</strong>.</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Ángulo Recto: 90°</li>
                        <li>Ángulo Llano: 180°</li>
                        <li>Vuelta Completa: 360°</li>
                    </ul>
                </LessonCard>

                <LessonCard title="Radianes">
                    <p className="mb-2">El radián es la unidad natural de los ángulos. Se define como el ángulo que abarca un arco de longitud igual al radio.</p>
                    <p className="text-sm bg-yellow-50 p-2 rounded border border-yellow-100 text-yellow-800">
                        1 vuelta = 2π radianes ≈ 6.28 rad
                    </p>
                </LessonCard>

                <LessonCard title="Vueltas">
                    <p>Simplemente cuenta cuántas rotaciones completas se han dado. Es muy útil en mecánica y motores.</p>
                </LessonCard>
            </div>
        </div>
    );
}
