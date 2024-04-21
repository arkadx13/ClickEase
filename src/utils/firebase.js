// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyADPn0YjYsO0EiVOoSLWI7jnD6bTGHlUXM",
	authDomain: "clickease-e8cdb.firebaseapp.com",
	projectId: "clickease-e8cdb",
	storageBucket: "clickease-e8cdb.appspot.com",
	messagingSenderId: "64185852089",
	appId: "1:64185852089:web:1584e05c17a4dc03a43b68",
	measurementId: "G-8J4YTLM1DZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// firebase authentication
export const auth = getAuth();
