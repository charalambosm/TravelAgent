import { auth } from "./firebase";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   sendPasswordResetEmail,
   onAuthStateChanged,
} from "firebase/auth";

function getErrorMessage(error) {
   const errorMessage = error.message;
   if (errorMessage.match(/auth\/invalid-email/)) {
      return "Please enter a valid email address.";
   } else if (errorMessage.match(/auth\/missing-password/)) {
      return "Please enter a password.";
   } else if (errorMessage.match(/auth\/wrong-password/)) {
      return "Incorrect password.";
   } else if (errorMessage.match(/auth\/user-not-found/)) {
      return "User not found. Please check your credentials.";
   } else if (errorMessage.match(/auth\/email-already-in-use/)) {
      return "The email address is already in use.";
   } else if (errorMessage.match(/auth\/weak-password/)) {
      return "The password should be at least 6 characters long.";
   } else {
      return "An unknown error occurred.";
   }
}

/**
 * Logout the current user.
 * 
 * @returns {Promise<void>} A Promise that resolves when the logout is successful.
 * @throws {string} If there is an error while logging out, the error message is thrown.
 * 
 * @example
 * logout()
 *   .then(() => {
 *     console.log('User logged out successfully.');
 *   })
 *   .catch((error) => {
 *     console.error('Error logging out:', error);
 *   });
 */
export const logout = () => {
   return new Promise((resolve, reject) => {
      auth.signOut()
         .then(() => {
            resolve();
         })
         .catch((error) => {
            reject(error.message);
         })
   })
};

/**
 * Registers a new user with the provided email and password.
 * 
 * @param {string} email - The email address of the user to register.
 * @param {string} password - The password for the user account.
 * @returns {Promise<firebase.auth.UserCredential>} A Promise that resolves with the user credentials if the registration is successful.
 * @throws {string} If there is an error while registering the user, the error message is thrown.
 * 
 * @example
 * const newUserEmail = 'newuser@example.com';
 * const newUserPassword = 'password123';
 * register(newUserEmail, newUserPassword)
 *   .then((userCredentials) => {
 *     console.log('User registered successfully. User credentials:', userCredentials);
 *   })
 *   .catch((error) => {
 *     console.error('Error registering user:', error);
 *   });
 */
export const register = (email, password) => {
   return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
         .then((userCredentials) => {
            resolve(userCredentials);
         })
         .catch((error) => {
            reject(getErrorMessage(error));
         })
   });
}

/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The email address of the user to log in.
 * @param {string} password - The password for the user account.
 * @returns {Promise<firebase.auth.UserCredential>} A Promise that resolves with the user credentials if the login is successful.
 * @throws {string} If there is an error while logging in, the error message is thrown.
 * 
 * @example
 * const userEmail = 'example@example.com';
 * const userPassword = 'password123';
 * login(userEmail, userPassword)
 *   .then((userCredentials) => {
 *     console.log('User logged in successfully. User credentials:', userCredentials);
 *   })
 *   .catch((error) => {
 *     console.error('Error logging in:', error);
 *   });
 */
export const login = (email, password) => {
   return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredentials) => {
            resolve(userCredentials);
         })
         .catch((error) => {
            reject(getErrorMessage(error));
         })
   })
}

/**
 * Sends a password reset email to the provided email address.
 * 
 * @param {string} email - The email address for which to send the password reset email.
 * @returns {Promise<void>} A Promise that resolves when the password reset email is successfully sent.
 * @throws {string} If there is an error while sending the password reset email, the error message is thrown.
 * 
 * @example
 * const emailAddress = 'example@example.com';
 * forgotPassword(emailAddress)
 *   .then(() => {
 *     console.log('Password reset email sent successfully.');
 *   })
 *   .catch((error) => {
 *     console.error('Error sending password reset email:', error);
 *   });
 */
export const forgotPassword = (email) => {
   return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
         .then(() => {
            resolve();
         })
         .catch((error) => {
            reject(getErrorMessage(error));
         })
   })
}

/**
 * Retrieves the currently authenticated user.
 * 
 * @returns {User|null} The currently authenticated user, or null if no user is authenticated.
 * 
 * @example
 * const currentUser = getCurrentUser();
 */
export const getCurrentUser = () => {
   return auth.currentUser
}

/**
 * Retrieve the authentication token for the currently logged-in user.
 * 
 * @returns {Promise<string>} A Promise that resolves with the authentication token (JWT) of the logged-in user.
 * @throws {Error} If there is no user authenticated or if an error occurs during token retrieval.
 * 
 * @example
 * getToken()
 *   .then(token => {
 *     console.log('Authentication token:', token);
 *   })
 *   .catch(error => {
 *     console.error('Error retrieving token:', error);
 *   });
 */

export const getToken = () => {
   return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
         if (user) {
            user.getIdToken()
               .then(token => {
                  unsubscribe();
                  resolve(token);
               })
               .catch(error => {
                  unsubscribe();
                  reject(error);
               });
         } else {
            unsubscribe();
            reject(new Error('No user is authenticated'));
         }
      });
   });
}