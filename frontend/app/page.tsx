import Featured from './components/Featured'
import Products from './types/products'
interface FeaturedProps {
  featuredProduct: Products[] | null
}

export default function Home() {
  return (
    <div>
      <Featured />
    </div>
  )
}
