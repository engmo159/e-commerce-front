'use client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Products from '../types/products'
import config from '../config.json'
import axios from 'axios'
import Center from './Center'
import ProductBox from './ProductBox'
import { spacing } from '../theme/spacing'

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: ${spacing.large}px;
`
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`
const NewProducts = () => {
  const [sortedProducts, setSortedProducts] = useState<Products | null>()
  const getSortedProducts = async () => {
    try {
      const backendURL = config.backendURL
      const { data } = await axios.get<Products | null>(
        `${backendURL}/products/sorted`
      )
      setSortedProducts(data)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }
  useEffect(() => {
    getSortedProducts()
  }, [])
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {sortedProducts &&
          sortedProducts.map((product: Products) => (
            <div>
              <ProductBox {...product} />
            </div>
          ))}
      </ProductsGrid>
    </Center>
  )
}

export default NewProducts
