import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

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
export const db = getFirestore(app)

//*Auth Functions

//*Sign in with email an password
export const signIn = async (user: { email: string, password: string }) => {
    return await signInWithEmailAndPassword(auth, user.email, user.password)
}

//*Create user with name, email an password
export const createUser = async (user: { email: string, password: string }) => {
    return await createUserWithEmailAndPassword(auth, user.email, user.password)
}

//*asignar nombre y foto al usuario actual que este autenticado
export const updateUser = (user: { displayName?: string | null | undefined; photoURL?: string | null | undefined; }) => {
    if (auth.currentUser) return updateProfile(auth.currentUser, user)
}

//*DataBase Functions

//* establecer documento en una collecion
export const setDocument = (path: string, data: any) => {
    data.createdAt = serverTimestamp()
    return setDoc(doc(db, path), data)
}