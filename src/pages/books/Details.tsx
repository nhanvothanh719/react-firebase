import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFirebase } from '../../hooks/useFirebase'
import type { BookSchema } from '../../types/book.type'
import { Button, Form } from 'react-bootstrap'

const BookDetailsPage = () => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const firebase = useFirebase()

  const [book, setBook] = useState<BookSchema | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate('/login')
    }
  }, [firebase, navigate])

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookDetails = await firebase.getBookById(params.id ?? '')
      setBook(bookDetails)
      } catch (error) {
        console.error('>>> Fail to fetch book details: ', error)
      }
    }
    fetchBook()
  }, [firebase, params])

  const placeOrder = async () => {
    try {
      const { user } = firebase
      if (!params.id || !user) return

      const order = await firebase.placeBookOrder({
        id: params.id,
        quantity: quantity,
        user: {
          id: user.uid,
          name: user.displayName ?? 'unknown',
          email: user.email ?? '',
        },
      })
      alert(`Place order successfully: ${order.id}`)
    } catch (error) {
      alert('Fail to place order')
      console.error('>>> Fail to place order: ', error)
    }
  }

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
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </Form.Group>
        </Form>
        <Button type="button" onClick={placeOrder}>
          Place order
        </Button>
      </div>
    </div>
  )
}

export default BookDetailsPage
