import React from 'react'
import { useCart } from '../../context/CartContext'
import './CartPage.css'

const CartPage = () => {
  const { cart, addItem, removeOne, removeAllOf, clearCart, getTotalPrice } = useCart()

  if (!cart.length) return (
    <main style={{ padding: 20 }}>
      <h2>Tu carrito está vacío</h2>
      <p>Agrega productos desde el catálogo.</p>
    </main>
  )

  return (
    <main style={{ padding: 20 }}>
      <h2>Resumen del carrito</h2>
      <section className="cart-list">
        {cart.map(item => (
          <div className="cart-item card" key={item.id}>
            <div className="cart-item__info">
              <h3>{item.title}</h3>
              <p className="muted">{item.category}</p>
              <p>${item.price} x {item.qty} = <strong>${item.price * item.qty}</strong></p>
            </div>

            <div className="cart-item__actions">
              <div className="qty-control">
                <button className="btn" onClick={() => removeOne(item.id)} aria-label="Disminuir">-</button>
                <div className="qty-box">{item.qty}</div>
                <button className="btn btn--primary" onClick={() => addItem(item, 1)} aria-label="Aumentar">+</button>
              </div>

                <div className="row-actions">
                <button className="btn" onClick={() => { removeAllOf(item.id); }}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <button className="btn" onClick={() => { clearCart(); }}>Vaciar carrito</button>
        <div>
          <strong>Total: </strong> ${getTotalPrice()}
        </div>
      </div>
    </main>
  )
}

export default CartPage
