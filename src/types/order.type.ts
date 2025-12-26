export type BookOrder = {
  bookId: string
  quantity: number
  userId: string
  userName: string
  userEmail: string
}

export type BookOrderSchema = BookOrder & { id: string }
