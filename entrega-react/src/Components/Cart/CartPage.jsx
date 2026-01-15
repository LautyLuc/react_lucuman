import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './CartPage.css'

const CartIconoSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 21 21"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 6.5h12.5l-1.586 5.55a2 2 0 0 1-1.923 1.45h-6.7a2 2 0 0 1-1.989-1.78L4.5 4.5h-2"
      ></path>
      <g fill="currentColor" transform="translate(2 4)">
        <circle cx="5" cy="12" r="1"></circle>
        <circle cx="13" cy="12" r="1"></circle>
      </g>
    </g>
  </svg>
)

export function CarritoWidget() {
  const { getTotalCount } = useCart()
  return (
    <Link to="/cart" className="cart-btn" aria-label="Ver carrito">
      <CartIconoSvg width={24} height={24} style={{ color: 'var(--text)' }} />
      {getTotalCount() > 0 && <span className="cart-badge">{getTotalCount()}</span>}
    </Link>
  )
}

const CartPage = () => {
  const { cart, addItem, removeOne, removeAllOf, clearCart, getTotalPrice, getTotalCount } = useCart()
  const totalPrice = getTotalPrice()
  const totalFinal = isNaN(totalPrice) ? 0 : Number(totalPrice || 0)
  const itemsCount = getTotalCount()

  if (!cart.length) return (
    <main style={{ padding: 20 }}>
      <h2>Tu carrito está vacío</h2>
      <p>Agrega productos desde el catálogo.</p>
    </main>
  )

  return (
    <main style={{ padding: 20 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Carrito de Compras</h2>
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          {itemsCount} {itemsCount === 1 ? 'artículo' : 'artículos'} • Total: <strong style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>${totalFinal.toFixed(2)}</strong>
        </p>
      </div>
      <section className="cart-list">
        {cart.map(item => (
          <div className="cart-item card" key={item.id}>
            <div className="cart-item__info">
              <h3>{item.title}</h3>
              <p className="muted">{item.category}</p>
              <p>${Number(item.price || 0).toFixed(2)} x {item.qty || item.cantidad || 0} = <strong>${((item.qty || item.cantidad || 0) * Number(item.price || 0)).toFixed(2)}</strong></p>
            </div>

            <div className="cart-item__actions">
              <div className="qty-control">
                <button className="btn" onClick={() => removeOne(item.id)} aria-label="Disminuir">-</button>
                <div className="qty-box">{item.qty || item.cantidad || 0}</div>
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
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div>
            <strong>Total: </strong> ${totalFinal.toFixed(2)}
          </div>
          <Link to="/checkout" className="btn btn--primary">Finalizar compra</Link>
        </div>
      </div>
    </main>
  )
}

export default CartPage
