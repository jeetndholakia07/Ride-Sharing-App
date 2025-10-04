import type { Role } from "../context/RoleContext.js";
import { openDB } from "./db.js";

export const addToken = async (token: any, userId: string, role: string, username: string): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readwrite");
    const store = transaction.objectStore("tokens");
    return new Promise<void>((resolve, reject) => {
        const addRequest = store.add({ id: 1, token: token, userId: userId, role: role, username: username });
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

export const updateToken = async (token: any, userId: string, role: string, username: string) => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readwrite");
    const store = transaction.objectStore("tokens");
    return new Promise<void>((resolve, reject) => {
        const putRequest = store.put({ id: 1, userId: userId, token: token, role: role, username: username });
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject("Error updating token");
    })
};

export const updateRole = async (role: string) => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readwrite");
    const store = transaction.objectStore("tokens");

    return new Promise<void>((resolve, reject) => {
        const getRequest = store.get(1);
        getRequest.onsuccess = () => {
            const token = getRequest.result;
            if (token) {
                token.role = role;
                const putRequest = store.put(token);

                putRequest.onsuccess = () => {
                    console.log('Role updated successfully');
                    resolve();
                };

                putRequest.onerror = () => {
                    console.error('Failed to update role');
                    reject(new Error('Failed to update role'));
                };
            } else {
                console.error('Token not found');
                reject(new Error('Token not found'));
            }
        };
        getRequest.onerror = () => {
            console.error('Failed to retrieve token');
            reject(new Error('Failed to retrieve token'));
        };
    });
};

export const findUserId = async (): Promise<any> => {
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
            reject("Error fetching user id");
        }
    })
};

export const findUsername = async (): Promise<any> => {
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
            const username = findUser.username;
            resolve(username);
        };
        request.onerror = () => {
            reject("Error fetching username");
        }
    })
};

export const updateUsername = async (username: string) => {
    const db = await openDB();
    const transaction = db.transaction("tokens", "readwrite");
    const store = transaction.objectStore("tokens");

    return new Promise<void>((resolve, reject) => {
        const getRequest = store.get(1);
        getRequest.onsuccess = () => {
            const token = getRequest.result;
            if (token) {
                token.username = username;
                const putRequest = store.put(token);

                putRequest.onsuccess = () => {
                    resolve();
                };

                putRequest.onerror = () => {
                    console.error('Failed to update username');
                    reject(new Error('Failed to update username'));
                };
            } else {
                console.error('Token not found');
                reject(new Error('Token not found'));
            }
        };
        getRequest.onerror = () => {
            console.error('Failed to retrieve token');
            reject(new Error('Failed to retrieve token'));
        };
    });
};

export const findRole = async (): Promise<Role> => {
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