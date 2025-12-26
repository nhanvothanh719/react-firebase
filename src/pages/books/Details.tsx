import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../../hooks/useFirebase'
import type { BookSchema } from '../../types/book.type'

const BookDetailsPage = () => {
  const params = useParams<{ id: string }>()
  const firebase = useFirebase()

  const [book, setBook] = useState<BookSchema | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      const bookDetails = await firebase.getBookById(params.id ?? '')
      setBook(bookDetails)
    }

    try {
      fetchBook()
    } catch (error) {
      console.error('>>> Fail to fetch book details: ', error)
    }
  }, [firebase, params])

  if (!book) return <div>Book is not found!</div>
  return (
    <div className="container mt-5">
      <h2>{book.name}</h2>
      <div>
        <p>Details</p>
        <ul>
          <li>Price: {book.price}</li>
          <li>ISBN Number: {book.isbnNumber}</li>
          <li>Author Id: {book.userId}</li>
        </ul>
      </div>
    </div>
  )
}

export default BookDetailsPage
