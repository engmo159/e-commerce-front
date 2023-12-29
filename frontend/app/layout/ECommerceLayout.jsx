'use client'
import Header from '../components/Header'
import { createGlobalStyle } from 'styled-components'
import { colors } from '../theme/colors'

const GlobalStyles = createGlobalStyle`
/* @tailwind base;
@tailwind components;
@tailwind utilities; */
body{
padding:0;
margin:0;
background-color: ${colors.pageBackground};
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
