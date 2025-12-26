import { useEffect, useState } from 'react'
import { useFirebase } from '../hooks/useFirebase'
import type { BookSchema } from '../types/book.type'
import BookCard from '../components/Book/Card'
import { CardGroup } from 'react-bootstrap'

const HomePage = () => {
  const firebase = useFirebase()
  const [books, setBooks] = useState<BookSchema[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const booksList = await firebase.getBooks()
      setBooks(booksList)
    }

    try {
      fetchBooks()
    } catch (error) {
      console.error('>>> Fail to get list of books: ', error)
    }
  }, [firebase])

  return (
    <div className="container">
      <h2>Books</h2>
      <CardGroup>
        {books.map((book) => {
          return <BookCard key={book.id} book={book} link={`/books/${book.id}`} />
        })}
      </CardGroup>
    </div>
  )
}

export default HomePage
