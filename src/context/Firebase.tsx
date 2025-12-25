import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, type UserCredential } from 'firebase/auth'
import { createContext } from 'react'
import { firebaseEnv } from '../config/firebase.env'

type FirebaseContextType = {
  registerWithEmail: (email: string, password: string) => Promise<UserCredential>
}

const firebaseConfig: FirebaseOptions = {
  apiKey: firebaseEnv.apiKey,
  authDomain: firebaseEnv.authDomain,
  projectId: firebaseEnv.projectId,
  storageBucket: firebaseEnv.storageBucket,
  messagingSenderId: firebaseEnv.messagingSenderId,
  appId: firebaseEnv.appId,
}

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)

export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password)
}

export const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)
