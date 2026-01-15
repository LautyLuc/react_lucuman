import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { createOrderFirestore } from '../../services/firestoreService'
import './Checkout.css'
import { productImageUrl } from '../../services/imageService'

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', address: '' })
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [orderResult, setOrderResult] = useState(null)
  const [error, setError] = useState(null)

  const totalPrice = getTotalPrice()
  const totalFinal = isNaN(totalPrice) ? 0 : Number(totalPrice || 0)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!form.name || !form.email || !form.address) {
      setError('Completa los datos para generar la orden')
      return
    }
    if (!cart.length) {
      setError('El carrito está vacío')
      return
    }

    const over = cart.find(p => (p.qty || p.cantidad || 0) > (p.stock ?? 0))
    if (over) {
      setError(`Stock insuficiente para ${over.title}. Ajusta la cantidad.`)
      return
    }

    const order = {
      buyer: { name: form.name, email: form.email, address: form.address },
      items: cart.map(p => ({ id: p.id, title: p.title, price: Number(p.price || 0), qty: p.qty || p.cantidad || 0 })),
      total: totalFinal
    }

    setLoading(true)
    try {
      const id = await createOrderFirestore(order)
      setOrderResult({ id, order, createdAt: new Date().toISOString() })
      clearCart()
    } catch (err) {
      console.error('Error creando orden:', err)
      const msg = String(err?.message || err)
      setError(msg || 'Error al procesar la compra. Intenta nuevamente.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const downloadReceipt = () => {
    if (!orderResult) return
    const content = {
      id: orderResult.id,
      createdAt: orderResult.createdAt,
      buyer: orderResult.order.buyer,
      items: orderResult.order.items,
      total: orderResult.order.total
    }
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `comprobante-${orderResult.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (orderResult) return (
    <main style={{ padding: 20 }}>
      <h2>Comprobante de compra</h2>
      <p>ID: <strong>{orderResult.id}</strong></p>
      <p>Fecha: {new Date(orderResult.createdAt).toLocaleString()}</p>
      <h3>Datos del comprador</h3>
      <p><strong>{orderResult.order.buyer.name}</strong> — {orderResult.order.buyer.email}</p>
      <p>{orderResult.order.buyer.address}</p>
      <h3>Artículos</h3>
      <ul>
        {orderResult.order.items.map(it => (
          <li key={it.id}>{it.title} — {it.qty} × ${it.price} = <strong>${(it.qty * it.price).toFixed(2)}</strong></li>
        ))}
      </ul>
      <p><strong>Total:</strong> ${orderResult.order.total}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="btn btn--primary" onClick={downloadReceipt}>Descargar comprobante</button>
        <a href="/" className="btn">Volver al inicio</a>
      </div>
    </main>
  )

  return (
    <main style={{ padding: 20 }}>
      <div className="checkout-root">
        <section className="checkout-form">
          <h2>Finalizar compra</h2>
          {error && <p style={{ color: 'crimson' }}>{error}</p>}

          <form onSubmit={handleSubmit} aria-label="Formulario de compra">
            <div className="checkout-field">
              <label className="muted-small">Nombre completo</label>
              <input name="name" placeholder="Ej: Juan Pérez" value={form.name} onChange={handleChange} />
            </div>

            <div className="checkout-field">
              <label className="muted-small">Correo electrónico</label>
              <input name="email" placeholder="ejemplo@correo.com" value={form.email} onChange={handleChange} />
            </div>

            <div className="checkout-field">
              <label className="muted-small">Dirección</label>
              <input name="address" placeholder="Calle Falsa 123, Ciudad" value={form.address} onChange={handleChange} />
            </div>

            <div style={{ marginTop: 8 }}>
              <button className="btn btn--primary" type="submit" disabled={loading || !cart.length || !form.name || !form.email || !form.address}>
                {loading ? 'Generando orden...' : 'Pagar y finalizar'}
              </button>
              <Link to="/" className="btn" style={{ marginLeft: 8 }}>Seguir comprando</Link>
            </div>
          </form>
        </section>

        <aside className="checkout-summary">
          <h3>Resumen del pedido</h3>
          <div className="checkout-items">
            {cart.length === 0 ? (
              <p className="muted-small">El carrito está vacío.</p>
            ) : (
              cart.map(it => (
                <div className="checkout-item" key={it.id}>
                  <img src={productImageUrl(it, 160, 120)} alt={it.title} />
                  <div className="meta">
                    <div className="title">{it.title}</div>
                    <div className="muted-small">{it.qty || it.cantidad || 0} × ${Number(it.price || 0).toFixed(2)} = <strong>${((it.qty || it.cantidad || 0) * Number(it.price || 0)).toFixed(2)}</strong></div>
                    <div className="muted-small">Stock: {it.stock ?? '—'}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="receipt-note">
            <div><strong>Total:</strong> ${totalFinal.toFixed(2)}</div>
            <div className="muted-small" style={{ marginTop: 8 }}>Al confirmar, se verificará stock y se aplicarán los cambios en el inventario.</div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Checkout
