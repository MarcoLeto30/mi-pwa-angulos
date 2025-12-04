import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 animate-fade-out">
      <div className="animate-bounce">
        <BrainCircuit size={80} className="text-gray-900 mb-4" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 tracking-wider animate-pulse">ÁNGULOS</h1>
      <p className="text-gray-500 mt-2 text-sm">Cargando conocimiento...</p>

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        .animate-fade-out {
          animation: fadeOut 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
