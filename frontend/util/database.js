import { get, push, ref, remove, set, query, equalTo, orderByChild, onValue } from "firebase/database";
import { database } from "./firebase";
import { getCurrentUser } from "./auth";

/**
 * Save a history item of a specific type for the current user.
 * 
 * @param {string} type - The type of history ('location', 'itinerary').
 * @param {object} data - The data object representing the history item.
 * @returns {Promise<void>} A Promise that resolves when the history item is successfully saved.
 * @throws {Error} If there is an error while saving the history item.
 * 
 * @example
 * const historyData = {
 *   placeId: 'abc123',
 *   dsecription: 'Athens, Greece',
 *   timestamp: Date.now()
 * };
 * saveHistory('location', historyData)
 *   .then(() => {
 *     console.log('History item saved successfully.');
 *   })
 *   .catch((error) => {
 *     console.error('Error saving history item:', error);
 *   });
 */
export const saveHistory = (type, data) => {
    return new Promise((resolve, reject) => {
        const userId = getCurrentUser().uid;
        const historyRef = ref(database, 'users/' + userId + '/history/' + type);
        const newHistoryItemRef = push(historyRef);
        data.timestamp = Date.now().toString();

        // Check if the id already exists in history
        onValue(query(historyRef, orderByChild('id'), equalTo(data.id)), (snapshot) => {
            if (!snapshot.exists()) {
                set(newHistoryItemRef, data)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } else {
                reject('Data already exists in history');
            }
        }, {
            onlyOnce: true
        });
    });
};


/**
 * Load the history of a specific type for the current user.
 * 
 * @param {string} type - The type of history to load ('location', 'itinerary').
 * @returns {Promise<Array<object>>} A Promise that resolves with an array of history items of the specified type for the current user. If no history items exist, an empty array is returned.
 * @throws {Error} If there is an error while loading the history items.
 * 
 * @example
 * loadHistory('location')
 *   .then((historyItems) => {
 *     console.log('History items:', historyItems);
 *   })
 *   .catch((error) => {
 *     console.error('Error loading history:', error);
 *   });
 */
export const loadHistory = (type) => {
    return new Promise((resolve, reject) => {
        const userId = getCurrentUser().uid;
        const historyRef = ref(database, 'users/' + userId + '/history/' + type);
        get(query(historyRef, orderByChild('timestamp')))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const dataArray = Object.values(data);
                    const sortedArray = dataArray.sort((a, b) => b.timestamp - a.timestamp);
                    resolve(sortedArray);
                } else {
                    resolve([]);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
};

/**
 * Delete the history of a specific type for the current user.
 * 
 * @param {string} type - The type of history to delete ('location', 'itinerary').
 * @returns {Promise<void>} A Promise that resolves when the history is successfully deleted.
 * @throws {Error} If there is an error while deleting the history items.
 * 
 * @example
 * deleteHistory('location')
 *   .then(() => {
 *     console.log('History deleted successfully.');
 *   })
 *   .catch((error) => {
 *     console.error('Error deleting history:', error);
 *   });
 */
export const deleteHistory = (type) => {
    return new Promise((resolve, reject) => {
        const userId = getCurrentUser().uid;
        const historyRef = ref(database, 'users/' + userId + '/history/' + type);
        remove(historyRef)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            })
    })
}