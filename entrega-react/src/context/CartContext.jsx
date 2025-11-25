import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      // ignore
    }
  }, [cart])

  const addItem = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p)
      }
      return [...prev, { ...product, qty }]
    })
  }


  const removeOne = (productId) => {
    setCart(prev => prev.flatMap(p => {
      if (p.id !== productId) return p
      const newQty = p.qty - 1
      if (newQty <= 0) return []
      return { ...p, qty: newQty }
    }))
  }


  const removeAllOf = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId))
  }

  const clearCart = () => setCart([])

  const getTotalCount = () => cart.reduce((s, p) => s + (p.qty || 0), 0)
  const getTotalPrice = () => cart.reduce((s, p) => s + (p.qty || 0) * (p.price || 0), 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeOne, removeAllOf, clearCart, getTotalCount, getTotalPrice, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
