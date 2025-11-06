export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("tokenDB", 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Create object store for tokens if it doesn't exist
            if (!db.objectStoreNames.contains("tokens")) {
                const store = db.createObjectStore("tokens", { keyPath: "id", autoIncrement: false });
                store.createIndex("userId", "userId", { unique: false });
                store.createIndex("role", "role", { unique: false });
                store.createIndex("token", "token", { unique: false });
                store.createIndex("username", "username", { unique: false });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject("Error opening IndexedDB");
        };
    });
};
