import { useContext } from 'react'
import { FirebaseContext } from '../context/Firebase'

export const useFirebase = () => {
  const firebaseContext = useContext(FirebaseContext)
  if (!firebaseContext) {
    throw new Error('useFirebase must be used within FirebaseProvider component')
  }
  return firebaseContext
}
