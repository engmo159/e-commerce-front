import styled from 'styled-components'
import Products from '../types/products'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../context/CartContextProvider'

const ProductWrapper = styled.div``
const WhiteBox = styled(Link)`
  background-color: ${colors.palette.neutral100};
  padding: ${spacing.large}px;
  height: 120px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: ${spacing.small}px;
  display: flex;
`
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
`
const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`
const ProductInfoBox = styled.div`
  margin-top: ${spacing.tiny}px;
`
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spacing.micro}px;
`
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`
const ProductBox = ({ _id, title, description, price, imageUrl }: Products) => {
  const url = `/products/${_id}`
  const { addProducts }: any = useContext(CartContext)
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <ImageContainer>
          {imageUrl && (
            <Image
              src={imageUrl[0]}
              alt=''
              layout='fill'
              style={{ width: '100%' }}
            />
          )}
        </ImageContainer>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>

          <Button onClick={() => addProducts(_id)} primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  )
}

export default ProductBox
