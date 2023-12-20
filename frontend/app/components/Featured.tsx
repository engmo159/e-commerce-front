'use client'
import styled from 'styled-components'
import Center from './Center'
import Button from './Button'
import { Cart } from '@/public/images/Svg'
import { FC, useEffect, useState } from 'react'
import Products from '../types/products'
import config from '../config.json'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'

const Bg = styled.div`
  background-color: ${colors.background};
  color: ${colors.text};
  padding: 50px 0;
`
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`
const Disc = styled.p`
  color: ${colors.textDim};
  font-size: 0.8rem;
`
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: ${spacing.huge}px;
  img {
    max-width: 100%;
  }
`
const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const ButtonsWrapper = styled.div`
  display: flex;
  gap: ${spacing.small}px;
  margin-top: ${spacing.large}px;
`

const DynamicImage = dynamic(() =>
  import('next/image').then(mod => mod.default)
)

const Featured: FC = () => {
  const [featuredProduct, setFeaturedProduct] = useState<Products | null>()
  const getFeaturedProducts = async () => {
    try {
      const backendURL = config.backendURL
      const featuredProductId = '6554dd4ef635aa4f3cb94eeb'
      const { data } = await axios.get<Products | null>(
        `${backendURL}/products/${featuredProductId}`
      )
      setFeaturedProduct(data)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }
  useEffect(() => {
    getFeaturedProducts()
  }, [])
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{featuredProduct?.title}</Title>

              <Disc>{featuredProduct?.description}</Disc>
              <ButtonsWrapper>
                <Button white outline>
                  Read more
                </Button>
                <Button primary>
                  <Cart />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <div>
            <DynamicImage
              width={400}
              height={200}
              alt=''
              src={featuredProduct?.imageUrl[0] || ''}
              priority={true}
            />
          </div>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}

export default Featured
