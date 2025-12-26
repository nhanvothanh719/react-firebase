import { useEffect, useState, type FormEvent } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useFirebase } from '../../hooks/useFirebase'
import type { Book } from '../../types/book.type'
import { useNavigate } from 'react-router-dom'

const BooksListPage = () => {
  const navigate = useNavigate()
  const firebase = useFirebase()
  const [name, setName] = useState('')
  const [isbnNumber, setIsbnNumber] = useState('') // ISBN: International Standard Book Number - mã định danh duy nhất cho một cuốn sách
  const [price, setPrice] = useState('')
  const [coverImgFile, setCoverImgFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate('/login')
    }
  }, [firebase, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const book: Book = {
        name,
        isbnNumber,
        price: +price,
        coverImg: coverImgFile,
      }
      const userId = firebase.user ? firebase.user.uid : null
      await firebase.createBook(book, userId)
      alert('Create book successfully')
      resetInput()
    } catch (error) {
      console.error('>>> Fail to add new book: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetInput = () => {
    setName('')
    setIsbnNumber('')
    setPrice('')
    setCoverImgFile(null)
  }

  return (
    <div className="container mt-5">
      <h2>Create book</h2>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBN Number"
            value={isbnNumber}
            onChange={(e) => setIsbnNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cover picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => {
              const target = e.target as HTMLInputElement
              const file = target.files?.[0]
              if (file) {
                setCoverImgFile(file)
              }
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </Form>
    </div>
  )
}

export default BooksListPage
