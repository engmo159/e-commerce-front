'use client'
import Header from '../components/Header'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
@tailwind base;
@tailwind components;
@tailwind utilities;
body{
padding:0;
margin:0;
}`

const ECommerceLayout = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
    </>
  )
}

export default ECommerceLayout
