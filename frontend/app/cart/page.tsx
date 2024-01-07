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
import Table from '../components/Table'
import Image from 'next/image'
import Input from '../components/Input'

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
const StyledInfoCell = styled.td`
  padding: 10px 0;
`
const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`
const QuantityLabel = styled.span`
  padding: 0 3px;
`
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`
const CartPage = () => {
  const { cartProducts, clearCart, addProducts, removeProduct } =
    useContext(CartContext)
  const [products, setProducts] = useState<Products[] | null>([])
  const [name, setName] = useState('')
  const [eMail, setEMail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country, setCountry] = useState('')

  const backendURL = config.backendURL
  const getCartProducts = async () => {
    try {
      if (cartProducts.length > 0) {
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
  useEffect(() => {
    if (window?.location.href.includes('success')) {
      clearCart()
    }
  }, [])

  const AddMoreProducts = (id: string) => {
    addProducts(id)
  }
  const removeCartProduct = (id: string) => {
    removeProduct(id)
  }

  let total = 0
  for (const productId of cartProducts) {
    const price = products?.find(p => p._id === productId)?.price || 0
    total += price
  }

  const goToPayment = async () => {
    const response = await axios.post(`${backendURL}/order/checkout`, {
      name,
      eMail,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    })
    if (response.data.url) {
      window.location = response.data.url
    }
  }
  if (window?.location.href.includes('success')) {
    return (
      <>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you as soon as your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    )
  }
  return (
    <Center>
      <ColumnsWrapper>
        <Box>
          <h2>Cart</h2>
          {!cartProducts?.length && <div>Your cart is empty</div>}
          {products?.length && (
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Products) => {
                  const productCount = cartProducts.filter(
                    cartProductId => cartProductId === product._id
                  ).length
                  return (
                    <tr key={product._id}>
                      <StyledInfoCell>
                        <ProductImageBox>
                          <Image
                            src={product.imageUrl[0]}
                            alt='product image'
                            width={100}
                            height={100}
                          />
                        </ProductImageBox>

                        {product.title}
                      </StyledInfoCell>
                      <td>
                        <Button
                          onClick={() => {
                            removeCartProduct(product._id)
                          }}
                        >
                          -
                        </Button>
                        <QuantityLabel>{productCount}</QuantityLabel>

                        <Button
                          onClick={() => {
                            AddMoreProducts(product._id)
                          }}
                        >
                          +
                        </Button>
                      </td>
                      <td>${product.price * productCount} </td>
                    </tr>
                  )
                })}
                <tr>
                  <td></td>
                  <td></td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Box>
        {/* !! means check boolean */}
        {!!cartProducts?.length && (
          <Box>
            <h2>Order information</h2>
            <Input
              type='text'
              placeholder='Name'
              value={name}
              name='name'
              onChange={ev => setName(ev.target.value)}
            />
            <Input
              type='email'
              placeholder='E Mail'
              value={eMail}
              name='eMail'
              onChange={ev => setEMail(ev.target.value)}
            />
            <CityHolder>
              <Input
                type='text'
                placeholder='City'
                value={city}
                name='city'
                onChange={ev => setCity(ev.target.value)}
              />
              <Input
                type='text'
                placeholder='Postal Code'
                value={postalCode}
                name='postalCode'
                onChange={ev => setPostalCode(ev.target.value)}
              />
            </CityHolder>
            <Input
              type='text'
              placeholder='Street Address'
              value={streetAddress}
              name='streetAddress'
              onChange={ev => setStreetAddress(ev.target.value)}
            />
            <Input
              type='text'
              placeholder='Country'
              value={country}
              name='country'
              onChange={ev => setCountry(ev.target.value)}
            />

            <Button block black onClick={goToPayment}>
              Continue to payment
            </Button>
          </Box>
        )}
      </ColumnsWrapper>
    </Center>
  )
}

export default CartPage
