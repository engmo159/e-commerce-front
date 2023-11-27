'use client'
import styled from 'styled-components'
import { FC } from 'react'

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`

interface CenterProps {
  children: React.ReactNode
}
const Center: FC<CenterProps> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>
}

export default Center
