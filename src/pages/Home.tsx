import { useEffect, useState } from 'react'
import { useFirebase } from '../hooks/useFirebase'
import type { BookSchema } from '../types/book.type'

const HomePage = () => {
  const firebase = useFirebase()
  const [books, setBooks] = useState<BookSchema[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await firebase.getBooks()
      const booksList = res.docs.map((item) => {
        const book = item.data()
        return {
          ...book,
          id: item.id,
        }
      }) as BookSchema[]
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
      <ul>
        {books.map((item) => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </div>
  )
}

export default HomePage
