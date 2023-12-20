import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../theme/colors'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: string
  primary?: boolean
  white?: boolean
  outline?: boolean
}

const StyledButton = styled.button.withConfig({
  shouldForwardProp: prop => !['white', 'outline', 'primary'].includes(prop),
})<ButtonProps>`
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  ${(props: { size: string }) =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `};
  ${(props: { primary: boolean }) =>
    props.primary &&
    css`
      background-color: ${colors.palette.blue};
      border: 1px solid ${colors.palette.blue};
      color: #fff;
    `};
  ${(props: { white: boolean; outline: boolean }) =>
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
