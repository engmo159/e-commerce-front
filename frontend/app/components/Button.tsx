import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../theme/colors'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: string
  primary?: boolean
  white?: boolean
  outline?: boolean
  block?: boolean
  black?: boolean
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
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  ${(props: ButtonProps) =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `};
  ${(props: ButtonProps) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${colors.primary};
      border: 1px solid ${colors.primary};
      color: #fff;
    `};
  ${(props: ButtonProps) =>
    props.primary &&
    props.outline &&
    css`
      background-color: ${colors.transparent};
      border: 1px solid ${colors.primary};
      color: ${colors.primary};
    `};
  ${(props: ButtonProps) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid white;
    `};
  ${(props: ButtonProps) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props: ButtonProps) =>
    props.black &&
    (props.outline
      ? css`
          background-color: ${colors.palette.neutral900};
          color: ${colors.palette.neutral100};
          border: 1px solid #fff;
        `
      : css`
          background-color: ${colors.palette.neutral900};
          color: ${colors.palette.neutral100};
        `)}
`

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}

export default Button
