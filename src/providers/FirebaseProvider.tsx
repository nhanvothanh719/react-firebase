import { type PropsWithChildren } from 'react'
import { FirebaseContext } from '../context/Firebase'

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  return <FirebaseContext.Provider value>{children}</FirebaseContext.Provider>
}

export default FirebaseProvider
