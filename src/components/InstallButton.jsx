import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export default function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-20 left-0 right-0 px-6 z-40 flex justify-center pointer-events-none">
            <button
                onClick={handleInstallClick}
                className="pointer-events-auto bg-yellow-400 text-black px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold animate-in slide-in-from-bottom-4 active:scale-95 transition-all border-2 border-yellow-500"
            >
                <Download size={20} />
                Instalar App
            </button>
        </div>
    );
}
