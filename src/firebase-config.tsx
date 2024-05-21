import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8J37tbQu0uFouL1JdsorxG2yFzVueFDI",
    authDomain: "shiv-jounrnal-app.firebaseapp.com",
    projectId: "shiv-jounrnal-app",
    storageBucket: "shiv-jounrnal-app.appspot.com",
    messagingSenderId: "28892897547",
    appId: "1:28892897547:web:dea7e8d56e838c2eb8820e",
    measurementId: "G-7JGHQVZ3JQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };