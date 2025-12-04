import questions from '../data/questions.json';
import { getRecentQuestions, saveRecentQuestions } from './db';

export class QuizEngine {
    static async generateQuiz(count = 5) {
        const recentIds = (await getRecentQuestions()) || [];

        // Filter out questions used recently if possible
        let availableQuestions = questions.filter(q => !recentIds.includes(q.id));

        // If we don't have enough "fresh" questions, reset pool
        if (availableQuestions.length < count) {
            availableQuestions = [...questions];
        }

        // Shuffle
        const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);

        // Update recent questions
        const newRecentIds = selected.map(q => q.id);
        await saveRecentQuestions(newRecentIds);

        return selected;
    }

    static checkAnswer(question, selectedIndex) {
        const isCorrect = question.correctIndex === selectedIndex;
        return {
            isCorrect,
            correctIndex: question.correctIndex,
            explanation: question.explanation
        };
    }
}
