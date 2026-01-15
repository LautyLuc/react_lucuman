import React, { createContext, useContext, useEffect, useState } from 'react'

const ContextoCarrito = createContext(null)

export const usarCarrito = () => useContext(ContextoCarrito)

// Backward compat alias
export const useCart = usarCarrito

export const ProveedorCarrito = ({ children }) => {
  const [carrito, establecerCarrito] = useState(() => {
    try {
      const datos = localStorage.getItem('carrito')
      const items = datos ? JSON.parse(datos) : []
      return items.map(item => ({
        ...item,
        qty: item.qty || item.cantidad || 0,
        cantidad: item.cantidad || item.qty || 0,
        price: Number(item.price || 0)
      }))
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(carrito))
    } catch (e) {}
  }, [carrito])

  const agregarProducto = (producto, cantidad = 1) => {
    establecerCarrito(anterior => {
      const existente = anterior.find(p => p.id === producto.id)
      const stock = Number(producto.stock ?? producto.raw?.cant ?? producto.cant ?? 0)
      const precio = Number(producto.price ?? 0)
      
      if (existente) {
        const deseado = existente.cantidad + cantidad
        const cantidadFinal = stock > 0 ? Math.min(deseado, stock) : deseado
        if (cantidadFinal === existente.cantidad) {
          try { alert('No hay más stock disponible para este producto') } catch (e) {}
          return anterior
        }
        return anterior.map(p => p.id === producto.id ? { ...p, cantidad: cantidadFinal, qty: cantidadFinal } : p)
      }
      const cantidadInicial = stock > 0 ? Math.min(cantidad, stock) : cantidad
      if (cantidadInicial <= 0) {
        try { alert('Producto sin stock') } catch (e) {}
        return anterior
      }
      return [...anterior, { ...producto, cantidad: cantidadInicial, price: precio, qty: cantidadInicial }]
    })
  }

  const disminuirCantidad = (productoId) => {
    establecerCarrito(anterior => anterior.flatMap(p => {
      if (p.id !== productoId) return p
      const nuevaCantidad = p.cantidad - 1
      if (nuevaCantidad <= 0) return []
      return { ...p, cantidad: nuevaCantidad, qty: nuevaCantidad }
    }))
  }

  const eliminarProducto = (productoId) => {
    establecerCarrito(anterior => anterior.filter(p => p.id !== productoId))
  }

  const vaciarCarrito = () => establecerCarrito([])

  const obtenerCantidadTotal = () => carrito.reduce((suma, p) => suma + (p.cantidad || p.qty || 0), 0)
  const obtenerPrecioTotal = () => {
    const total = carrito.reduce((suma, p) => {
      const cantidad = p.cantidad || p.qty || 0
      const precio = Number(p.price || 0)
      return suma + (cantidad * precio)
    }, 0)
    return isNaN(total) ? 0 : total
  }

  return (
    <ContextoCarrito.Provider value={{
      carrito,
      agregarProducto,
      disminuirCantidad,
      eliminarProducto,
      vaciarCarrito,
      obtenerCantidadTotal,
      obtenerPrecioTotal,
      establecerCarrito,
      addItem: agregarProducto,
      removeOne: disminuirCantidad,
      removeAllOf: eliminarProducto,
      getTotalPrice: obtenerPrecioTotal,
      getTotalCount: obtenerCantidadTotal,
      clearCart: vaciarCarrito,
      cart: carrito
    }}>
      {children}
    </ContextoCarrito.Provider>
  )
}

export default ContextoCarrito
