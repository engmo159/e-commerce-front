'use client'
import styled from 'styled-components'
import Center from './Center'
import Image from 'next/image'
import Button from './Button'
import { Cart } from '@/public/images/Svg'

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`
const Disc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
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
  gap: 10px;
  margin-top: 25px;
`

const Featured = () => {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>Pro Anywhere</Title>
              <Disc>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
                maxime, quidem eius facilis fuga distinctio perspiciatis
                nesciunt rem labore ad quos ea voluptates! Voluptatibus ad modi
                temporibus nam hic? Perferendis?
              </Disc>
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
            <Image
              width={400}
              height={200}
              alt=''
              src='https://cdn.pixabay.com/photo/2017/01/29/13/21/mobile-devices-2017980_1280.png'
            />
          </div>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}

export default Featured
