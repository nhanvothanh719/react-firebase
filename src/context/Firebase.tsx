import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { createContext } from 'react'
import { firebaseEnv } from '../config/firebase.env'

type FirebaseContextType = {}

const firebaseConfig: FirebaseOptions = {
  apiKey: firebaseEnv.apiKey,
  authDomain: firebaseEnv.authDomain,
  projectId: firebaseEnv.projectId,
  storageBucket: firebaseEnv.storageBucket,
  messagingSenderId: firebaseEnv.messagingSenderId,
  appId: firebaseEnv.appId,
}

const firebaseApp = initializeApp(firebaseConfig)

export const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)
