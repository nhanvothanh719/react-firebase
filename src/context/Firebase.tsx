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
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
// import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { createContext } from 'react'
import { firebaseEnv } from '../config/firebase.env'
import type { Book, BookSchema } from '../types/book.type'
import type { BookOrder, BookOrderSchema } from '../types/order.type'

type FirebaseContextType = {
  isLoggedIn: boolean
  user: User | null
  registerWithEmail: (email: string, password: string) => Promise<UserCredential>
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>
  loginWithGoogle: () => Promise<UserCredential>
  createBook: (book: Book, userId: string | null) => Promise<void>
  getBooks: () => Promise<BookSchema[]>
  getBookById: (id: string) => Promise<BookSchema | null>
  getBooksByAuthorId: (userId: string) => Promise<BookSchema[]>
  placeBookOrder: ({
    id,
    quantity,
    user,
  }: {
    id: string
    quantity: number
    user: { id: string; name: string; email: string }
  }) => Promise<BookOrderSchema>
  getOrdersByBookId: (bookId: string) => Promise<BookOrderSchema[]>
}

const BOOK_PATH = 'books'
const ORDER_PATH = 'orders'

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

/**
 * User Auth
 */
export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password)
}

export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password)
}

export const loginWithGoogle = async () => {
  return await signInWithPopup(firebaseAuth, googleProvider)
}

/**
 * Book
 */
export const createBook = async (book: Book, userId: string | null) => {
  // const bookImgRef = ref(storage, `uploads/images/books/${book.name}-${Date.now()}`)
  // const uploadResult = await uploadBytes(bookImgRef, book.coverImg)

  await addDoc(collection(firestore, BOOK_PATH), {
    name: book.name,
    isbnNumber: book.isbnNumber,
    price: book.price,
    imageUrl: '', // uploadResult.ref.fullPath
    userId: userId,
  })
}

export const getBooks = async () => {
  const res = await getDocs(collection(firestore, BOOK_PATH))
  const booksList = res.docs.map((item) => {
    const book = item.data()
    return {
      ...book,
      id: item.id,
    } as BookSchema
  })
  return booksList
}

export const getBookById = async (id: string) => {
  const docRef = doc(firestore, BOOK_PATH, id)
  const res = await getDoc(docRef)
  if (!res.exists()) return null
  const book = {
    ...res.data(),
    id: res.id,
  } as BookSchema
  return book
}

export const getBooksByAuthorId = async (userId: string) => {
  const collectionRef = collection(firestore, BOOK_PATH)
  const q = query(collectionRef, where('userId', '==', userId))
  const res = await getDocs(q)
  return res.docs.map((item) => {
    return {
      ...item.data(),
      id: item.id,
    } as BookSchema
  })
}

/**
 * Book Order
 */
export const placeBookOrder = async ({
  id,
  quantity,
  user,
}: {
  id: string
  quantity: number
  user: { id: string; name: string; email: string }
}) => {
  const collectionRef = collection(firestore, BOOK_PATH, id, ORDER_PATH)
  const order: BookOrder = {
    bookId: id,
    quantity,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
  }
  const res = await addDoc(collectionRef, order)
  const createdOrder: BookOrderSchema = {
    ...order,
    id: res.id,
  }
  return createdOrder
}

export const getOrdersByBookId = async (bookId: string) => {
  const collectionRef = collection(firestore, BOOK_PATH, bookId, ORDER_PATH)
  const res = await getDocs(collectionRef)
  return res.docs.map((item) => {
    return {
      ...item.data(),
      id: item.id,
    } as BookOrderSchema
  })
}

export const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)
