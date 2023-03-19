// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBvsP0fDH9aLU8VIGZrrj4ik75P8UmqFqs",
//     authDomain: "recipes-98448.firebaseapp.com",
//     projectId: "recipes-98448",
//     storageBucket: "recipes-98448.appspot.com",
//     messagingSenderId: "988430960110",
//     appId: "1:988430960110:web:4f0feef7688c696398baff",
//     measurementId: "G-LZFJ9M2S13"
// };

export const auth = getAuth();
export const db = getDatabase(app);
const app = initializeApp(firebaseConfig);
export default app;
