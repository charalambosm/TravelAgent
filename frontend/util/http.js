import axios from "axios";
import { getToken } from "./auth";

// Local Host use for testing
// const BACKEND_URL = 'http://192.168.1.94:5000'

const backendConfig = require('./private/backendConfig.json')
const BACKEND_URL = "http://" + backendConfig.url + ":" + backendConfig.port;

/**
 * Get the Axios configuration with JWT user token.
 * 
 * @returns {Promise<object>} A Promise that resolves with the Axios configuration object containing the JWT user token.
 * @throws {Error} If there is an error while getting the JWT user token.
 * 
 * @example
 * getAxiosConfig()
 *   .then((config) => {
 *     console.log('Axios configuration:', config);
 *   })
 *   .catch((error) => {
 *     console.error('Error getting Axios configuration:', error);
 *   });
 */
const getAxiosConfig = () => {
    return new Promise((resolve) => {
        getToken()
            .then((token) => {
                const axiosConfig = {
                    timeout: 0,
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
                resolve(axiosConfig);
            })
            .catch((error) => {
                console.log('Error getting JWT user token: ' + error);
            })
    })
}

/**
 * Initializes the travel itinerary generator with the provided parameters.
 * 
 * @param {object} data - The input data to initialize the itinerary generator.
 * @returns {Promise<number>} The HTTP status code of the response from the backend server.
 * @throws {Error} If there is an error during the initialization process or obtaining the Axios configuration.

* @example
 * const location = "Barcelona";
 * const duration = 3;
 * const arrival_date = "30-04-2023";
 * const interests = {
 *     "art": false,
 *     "history": false,
 *     "architecture": false,
 *     "shopping": true,
 *     "nightlife": false,
 *     "outdoor": true
 * };
 * 
 * const data = {
 *     location: location,
 *     duration: duration,
 *     date: date,
 *     interests: interests
 * };
 *        
 * initialize(data)
 *   .then((status) => {
 *     console.log('Initialization successful. Status:', status);
 *   })
 *   .catch((error) => {
 *     console.error('Error during initialization:', error);
 *   });
 */
export const initialize = (data) => {
    return new Promise((resolve, reject) => {
        getAxiosConfig()
            .then((config) => {
                axios.post(BACKEND_URL + '/initialize', data, config)
                    .then((response) => {
                        resolve(response.status);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
            .catch((error) => {
                reject(error);
            })
    })
}

/**
 * Generate an itinerary from the backend server.
 * 
 * @returns {Promise<any>} A Promise that resolves with the generated itinerary data if the request is successful.
 * @throws {Error} If there is an error during the generation process or obtaining the Axios configuration.
 * 
 * @example
 * generateItinerary()
 *   .then((itineraryData) => {
 *     console.log('Generated itinerary:', itineraryData);
 *   })
 *   .catch((error) => {
 *     console.error('Error generating itinerary:', error);
 *   });
 */
export const generateItinerary = (abortControllerSignal) => {
    return new Promise((resolve, reject) => {
        getAxiosConfig()
            .then((config) => {
                config.signal = abortControllerSignal;
                axios.get(BACKEND_URL + '/itinerary', config)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

/**
 * Search for a location using a query string.
 * 
 * @param {string} query - The query string to search for a location.
 * @returns {Promise<any>} A Promise that resolves with the search results data if the request is successful.
 * @throws {Error} If there is an error during the search process or obtaining the Axios configuration.
 * 
 * @example
 * 
 * // Example usage:
 * const searchQuery = 'New York';
 * searchLocation(searchQuery)
 *   .then((searchResults) => {
 *     console.log('Search results:', searchResults);
 *   })
 *   .catch((error) => {
 *     console.error('Error searching for location:', error);
 *   });
 */
export const searchLocation = (query) => {
    return new Promise((resolve, reject) => {
        getAxiosConfig()
            .then((config) => {
                config.timeout = 3000;
                config.params = {
                    query: query
                };
                axios.get(BACKEND_URL + '/search_location', config)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    })

            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    })
}