export type Book = {
  name: string
  isbnNumber: string
  price: number
  coverImg: File | null
}

export type BookSchema = {
  id: string
  name: string
  isbnNumber: string
  price: number
  imageUrl: string | null
  userId: string | null
}
