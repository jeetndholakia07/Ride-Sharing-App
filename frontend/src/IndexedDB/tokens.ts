import { openDB } from "./db.js";

export const addToken = async (token: any, userId: string, role: string): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readwrite");
    const store = transaction.objectStore("tokens");
    return new Promise<void>((resolve, reject) => {
        const addRequest = store.add({ id: 1, token: token, userId: userId, role: role });
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject("Error adding token");
    });
};

export const findToken = async () => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readonly");
    const store = transaction.objectStore("tokens");
    return new Promise((resolve, reject) => {
        const request = store.get(1);
        request.onsuccess = () => {
            const findToken = request.result;
            if (!findToken) {
                return resolve(null);
            }
            const token = findToken.token;
            resolve(token);
        };
        request.onerror = () => {
            reject("Error fetching token");
        }
    })
};

export const updateToken = async (token: any, userId: string, role: string) => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readwrite");
    const store = transaction.objectStore("tokens");
    return new Promise<void>((resolve, reject) => {
        const putRequest = store.put({ id: 1, userId: userId, token: token, role: role });
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject("Error updating token");
    })
};

export const findUserId = async () => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readonly");
    const store = transaction.objectStore("tokens");
    return new Promise((resolve, reject) => {
        const request = store.get(1);
        request.onsuccess = () => {
            const findUser = request.result;
            if (!findUser) {
                return resolve(null);
            }
            const userId = findUser.userId;
            resolve(userId);
        };
        request.onerror = () => {
            reject("Error fetching username");
        }
    })
};

export const findRole = async () => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readonly");
    const store = transaction.objectStore("tokens");
    return new Promise((resolve, reject) => {
        const request = store.get(1);
        request.onsuccess = () => {
            const findUser = request.result;
            if (!findUser) {
                return resolve(null);
            }
            const role = findUser.role;
            resolve(role);
        };
        request.onerror = () => {
            reject("Error fetching user role");
        }
    });
};

export const deleteToken = async (): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readwrite");
    const store = transaction.objectStore("tokens");
    return new Promise<void>((resolve, reject) => {
        const deleteRequest = store.delete(1);
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => reject("Error deleting token");
    });
};