interface Products {
  map(
    arg0: (product: Products) => import('react').JSX.Element
  ): import('react').ReactNode
  _id: string
  title: string
  description: string
  category: string
  price: number
  imageUrl: string
  productProperties: object
}
export default Products
