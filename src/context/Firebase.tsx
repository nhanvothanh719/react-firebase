import { initializeApp, type FirebaseOptions } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
// import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { createContext } from 'react'
import { firebaseEnv } from '../config/firebase.env'
import type { Book } from '../types/book.type'

type FirebaseContextType = {
  isLoggedIn: boolean
  user: User | null
  registerWithEmail: (email: string, password: string) => Promise<UserCredential>
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>
  loginWithGoogle: () => Promise<UserCredential>
  createBook: (book: Book, userId: string) => Promise<void>
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
export const firebaseAuth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
// const storage = getStorage(firebaseApp)

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

export const createBook = async (book: Book, userId: string) => {
  // const bookImgRef = ref(storage, `uploads/images/books/${book.name}-${Date.now()}`)
  // const uploadResult = await uploadBytes(bookImgRef, book.coverImg)

  await addDoc(collection(firestore, 'books'), {
    name: book.name,
    isbnNumber: book.isbnNumber,
    price: book.price,
    imageUrl: '', // uploadResult.ref.fullPath
    userId: userId,
  })
}

export const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)
