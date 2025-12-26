import { useEffect, useState } from 'react'
import type { BookOrderSchema } from '../../types/order.type'
import { useFirebase } from '../../hooks/useFirebase'
import { useParams } from 'react-router-dom'

const OrdersListPerBookPage = () => {
  const params = useParams<{ id: string }>()
  const firebase = useFirebase()
  const [orders, setOrders] = useState<BookOrderSchema[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!params.id) return
        const bookOrders = await firebase.getOrdersByBookId(params.id)
        setOrders(bookOrders)
      } catch (error) {
        console.error('>>> Fail to fetch orders of this book: ', error)
      }
    }
    fetchOrders()
  }, [params, firebase])

  return (
    <div className="container mt-5">
      <h2>All orders</h2>
      <div>
        <ol>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Book ID: {order.bookId}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Order by email: {order.userEmail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default OrdersListPerBookPage
