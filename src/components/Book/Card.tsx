import { Button, Card } from 'react-bootstrap'
import type { BookSchema } from '../../types/book.type'
import { useNavigate } from 'react-router-dom'

const BookCard = ({ book }: { book: BookSchema }) => {
  const navigate = useNavigate()

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{book.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${book.price}</Card.Subtitle>
        <Card.Text>{book.isbnNumber}</Card.Text>
        <Button type="button" onClick={() => navigate(`/books/${book.id}`)}>
          View details
        </Button>
      </Card.Body>
    </Card>
  )
}

export default BookCard
