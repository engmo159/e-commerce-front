interface Products {
  map(product: any): import('react').ReactNode
  _id: string
  title: string
  description: string
  category: string
  price: number
  imageUrl: string
  productProperties: object
}
export default Products
