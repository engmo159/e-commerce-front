'use client'
import { FC, createContext, useEffect, useState, ReactNode } from 'react'

interface CartContextType {
  cartProducts: string[]
  setCartProducts: React.Dispatch<React.SetStateAction<string[]>>
  addProducts: (productId: string) => void
  removeProduct: (productId: string) => void
  clearCart: () => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
  addProducts: () => {},
  removeProduct: () => {},
  clearCart: () => {},
})

const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
  const [windowState, setWindowState] = useState(false)
  // const ls = typeof window !== 'undefined' ? window.localStorage : null
  useEffect(() => {
    if (typeof window == 'undefined') {
      setWindowState(true)
    } else {
      setWindowState(false)
    }
  }, [])
  const ls = windowState ? window.localStorage : null
  // const ls = window.localStorage
  const [cartProducts, setCartProducts] = useState<string[]>([])

  const addProducts = (productId: string) => {
    setCartProducts(prev => [...prev, productId])
  }
  const removeProduct = (productId: string) => {
    setCartProducts((prev: string[]) => {
      const pos = prev.indexOf(productId)

      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos)
      }
      return prev
    })
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
  const clearCart = () => {
    setCartProducts([])
    ls?.setItem('cart', JSON.stringify(cartProducts))
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProducts,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
