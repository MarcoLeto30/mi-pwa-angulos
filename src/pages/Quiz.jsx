import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine } from '../services/quizEngine';
import { saveResult } from '../services/db';
import { CheckCircle, XCircle, ArrowRight, Loader } from 'lucide-react';
import clsx from 'clsx';

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadQuiz();
    }, []);

    const loadQuiz = async () => {
        const q = await QuizEngine.generateQuiz(5);
        setQuestions(q);
        setLoading(false);
    };

    const handleOptionClick = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        const currentQuestion = questions[currentIndex];
        const { isCorrect } = QuizEngine.checkAnswer(currentQuestion, selectedOption);

        if (isCorrect) {
            setScore(s => s + 1);
            // Vibration for correct answer (short)
            if (navigator.vibrate) navigator.vibrate(50);
        } else {
            // Vibration for wrong answer (long)
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        }

        setIsAnswered(true);
    };

    const handleNext = async () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            // Finish quiz
            const result = {
                score,
                totalQuestions: questions.length,
                details: { questions } // Simplified
            };
            await saveResult(result);
            navigate('/results', { state: result });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="p-6 max-w-md mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-gray-500">Pregunta {currentIndex + 1}/{questions.length}</span>
                <span className="text-sm font-bold text-primary">Puntos: {score}</span>
            </div>

            <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{currentQuestion.text}</h2>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        let stateClass = "border-gray-200 hover:border-primary hover:bg-indigo-50";

                        if (isAnswered) {
                            if (index === currentQuestion.correctIndex) {
                                stateClass = "border-green-500 bg-green-50 text-green-700";
                            } else if (index === selectedOption) {
                                stateClass = "border-red-500 bg-red-50 text-red-700";
                            } else {
                                stateClass = "border-gray-100 opacity-50";
                            }
                        } else if (selectedOption === index) {
                            stateClass = "border-primary bg-indigo-50 ring-2 ring-primary ring-opacity-50";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={isAnswered}
                                className={clsx(
                                    "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 font-medium",
                                    stateClass
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {isAnswered && index === currentQuestion.correctIndex && <CheckCircle size={20} className="text-green-600" />}
                                    {isAnswered && index === selectedOption && index !== currentQuestion.correctIndex && <XCircle size={20} className="text-red-600" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                        <p className="text-sm text-gray-600">
                            <span className="font-bold text-gray-900">Explicación:</span> {currentQuestion.explanation}
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-6">
                {!isAnswered ? (
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className="w-full py-4 bg-yellow-400 text-black rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:shadow-none transition-all active:scale-95 border-2 border-yellow-500"
                    >
                        Comprobar
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="w-full py-4 bg-gray-200 text-black rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 border-2 border-gray-300"
                    >
                        {currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                        <ArrowRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}
