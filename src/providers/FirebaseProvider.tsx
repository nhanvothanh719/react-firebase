import { type PropsWithChildren } from 'react'
import { FirebaseContext, registerWithEmail, loginWithEmail, loginWithGoogle } from '../context/Firebase'

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  return (
    <FirebaseContext.Provider value={{ registerWithEmail, loginWithEmail, loginWithGoogle }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider
