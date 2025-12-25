import { initializeApp, type FirebaseOptions } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  type UserCredential,
} from 'firebase/auth'
import { createContext } from 'react'
import { firebaseEnv } from '../config/firebase.env'

type FirebaseContextType = {
  registerWithEmail: (email: string, password: string) => Promise<UserCredential>
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>
  loginWithGoogle: () => Promise<UserCredential>
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
const googleProvider = new GoogleAuthProvider()

export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password)
}

export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password)
}

export const loginWithGoogle = async () => {
  return await signInWithPopup(firebaseAuth, googleProvider)
}

export const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)
