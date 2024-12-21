import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgkWUiBG3rRNR709n1tJZby-8YswSLBFA",
    authDomain: "admin-next-dc5dd.firebaseapp.com",
    projectId: "admin-next-dc5dd",
    storageBucket: "admin-next-dc5dd.firebasestorage.app",
    messagingSenderId: "940637750198",
    appId: "1:940637750198:web:f83386abd883afdfb27717"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app

export const auth = getAuth(app)

//*Auth Functions

//*Sign in with email an password
export const signIn = async (user: { email: string, password: string }) => {
    return await signInWithEmailAndPassword(auth, user.email, user.password)
}
