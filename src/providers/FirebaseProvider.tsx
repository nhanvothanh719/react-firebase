import { type PropsWithChildren } from 'react'
import { FirebaseContext, registerWithEmail } from '../context/Firebase'

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  return <FirebaseContext.Provider value={{ registerWithEmail }}>{children}</FirebaseContext.Provider>
}

export default FirebaseProvider
