'use client'
import styled from 'styled-components'
import { colors } from '../theme/colors'
import Center from '../components/Center'
import { spacing } from '../theme/spacing'
import Button from '../components/Button'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContextProvider'
import config from '../config.json'
import axios from 'axios'
import Products from '../types/products'

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: ${spacing.huge}px;
`
const Box = styled.div`
  background-color: ${colors.palette.neutral100};
  border-radius: 10px;
  padding: ${spacing.extraLarge}px;
`
const CartPage = () => {
  const { cartProducts } = useContext(CartContext)
  const [products, setProducts] = useState<Products[] | null>([])
  const getCartProducts = async () => {
    try {
      if (cartProducts.length > 0) {
        const backendURL = config.backendURL

        const { data } = await axios.post(`${backendURL}/products/cartIds`, {
          ids: cartProducts,
        })

        setProducts(data)
      } else {
        setProducts([])
      }
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }
  useEffect(() => {
    getCartProducts()
  }, [cartProducts])
  return (
    <Center>
      <ColumnsWrapper>
        <Box>
          {!cartProducts?.length && <div>Your cart is empty</div>}

          <h2>Cart</h2>
          {products?.length && (
            <div>
              {products.map((product: Products) => {
                const productCount = cartProducts.filter(
                  cartProduct => cartProduct === product._id
                ).length

                return (
                  <div key={product._id}>
                    {product.title}:{productCount}
                  </div>
                )
              })}
            </div>
          )}
        </Box>
        {/* !! means check boolean */}
        {!!cartProducts?.length && (
          <Box>
            <h2>Order information</h2>
            <input type='text' placeholder='Address' />
            <input type='text' placeholder='Address 2' />
            <Button block black>
              Continue to payment
            </Button>
          </Box>
        )}
      </ColumnsWrapper>
    </Center>
  )
}

export default CartPage
