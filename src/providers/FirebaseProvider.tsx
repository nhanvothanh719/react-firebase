import { useEffect, useState, type PropsWithChildren } from 'react'
import { FirebaseContext, registerWithEmail, loginWithEmail, loginWithGoogle, firebaseAuth } from '../context/Firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  const isLoggedIn = user !== null

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user)
        return
      }
      setUser(null)
    })
  }, [])

  return (
    <FirebaseContext.Provider value={{ isLoggedIn, registerWithEmail, loginWithEmail, loginWithGoogle }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider
