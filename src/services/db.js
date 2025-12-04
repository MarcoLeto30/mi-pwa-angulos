import { openDB } from 'idb';

const DB_NAME = 'angulos-db';
const STORE_RESULTS = 'results';
const STORE_STATE = 'state';

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_RESULTS)) {
                db.createObjectStore(STORE_RESULTS, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(STORE_STATE)) {
                db.createObjectStore(STORE_STATE);
            }
        },
    });
};

export const saveResult = async (result) => {
    const db = await initDB();
    return db.add(STORE_RESULTS, {
        ...result,
        date: new Date(),
    });
};

export const getHistory = async () => {
    const db = await initDB();
    return db.getAll(STORE_RESULTS);
};

export const saveRecentQuestions = async (questionIds) => {
    const db = await initDB();
    return db.put(STORE_STATE, questionIds, 'recentQuestions');
};

export const getRecentQuestions = async () => {
    const db = await initDB();
    return db.get(STORE_STATE, 'recentQuestions');
};
