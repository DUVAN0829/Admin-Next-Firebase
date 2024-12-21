import { Timestamp } from "firebase/firestore"

export interface User {
    uid: string
    image?: string
    names: string
    email: string
    password?: string
    createAt: Timestamp
}