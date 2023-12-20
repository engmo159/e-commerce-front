'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Center from './Center'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
const StyledHeader = styled.header`
  background-color: ${colors.background};
`
const Logo = styled(Link)`
  color: ${colors.text};
  text-decoration: none;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`
const NavLink = styled(Link)`
  color: ${colors.textDim};
  text-decoration: none;
`
const StyledNav = styled.nav`
  display: flex;
  gap: ${spacing.medium}px;
`
const Header = () => {
  return (
    <>
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={'/'}>Ecommerce</Logo>
            <StyledNav>
              <NavLink href={'/'}>Home</NavLink>
              <NavLink href={'/products'}>All Products</NavLink>
              <NavLink href={'/categories'}>Categories</NavLink>
              <NavLink href={'/account'}>Account</NavLink>
              <NavLink href={'/cart'}>Cart (0)</NavLink>
            </StyledNav>
          </Wrapper>
        </Center>
      </StyledHeader>
    </>
  )
}

export default Header
