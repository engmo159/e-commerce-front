'use client'
import { FC, createContext, useEffect, useState, ReactNode } from 'react'
import Products from '../types/products'

interface CartContextType {
  cartProducts: string[]
  setCartProducts: React.Dispatch<React.SetStateAction<string[]>>
  addProducts: (product: string) => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
  addProducts: () => {},
})

const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
  const ls = typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState<string[]>([])

  const addProducts = (product: string) => {
    setCartProducts(prev => [...prev, product])
  }

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart') || '[]'))
    }
  }, [])

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProducts }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
