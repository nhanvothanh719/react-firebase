import { useEffect, useState } from 'react'
import { useFirebase } from '../../hooks/useFirebase'
import type { BookSchema } from '../../types/book.type'
import BookCard from '../../components/Book/Card'
import { useNavigate } from 'react-router-dom'

const BookOrdersListPage = () => {
  const navigate = useNavigate()
  const firebase = useFirebase()
  const [books, setBooks] = useState<BookSchema[]>([])

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate('/login')
    }
  }, [firebase, navigate])

  useEffect(() => {
    const fetchMyBooks = async () => {
      const { user } = firebase
      if (!user) return
      const ownedBooks = await firebase.getBooksByAuthorId(user.uid)
      setBooks(ownedBooks)
    }
    fetchMyBooks()
  }, [firebase])

  return (
    <div className="container mt-5">
      <h2>My orders</h2>
      <div>
        {books.map((book) => (
          <BookCard key={book.id} book={book} link={`/orders/books/${book.id}`} />
        ))}
      </div>
    </div>
  )
}

export default BookOrdersListPage
