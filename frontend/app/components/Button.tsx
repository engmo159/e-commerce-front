import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: string
  primary?: ReactNode
  white?: ReactNode
  outline?: ReactNode
}

const StyledButton = styled.button<ButtonProps>`
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center
    ${props =>
      props.size === 'l' &&
      css`
        font-size: 1.2rem;
        padding: 10px 20px;
      `};
  ${props =>
    props.primary &&
    css`
      background-color: #5542f6;
      border: 1px solid #5542f6;
      color: #fff;
    `};
  ${props =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid white;
    `};
`

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}

export default Button
