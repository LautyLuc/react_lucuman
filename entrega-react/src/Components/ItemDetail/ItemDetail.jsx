import React, { useState } from 'react'
import './ItemDetail.css'
import { useCart } from '../../context/CartContext'
import { toast } from 'react-toastify'

const ItemDetail = ({ product }) => {
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()

  const add = () => setQty(q => Math.min(99, q + 1))
  const sub = () => setQty(q => Math.max(1, q - 1))

  // Placeholder image using placeholder.com, con texto del producto (espacios reemplazados por +)
  const placeholder = `https://picsum.photos/seed/detail-${product.id}/640/640`

  return (
    <article className="item-detail card">
      <div className="item-detail__grid">
        <div className="item-detail__media">
          <img src={placeholder} alt={product.title} />
        </div>

        <div className="item-detail__info">
          <h2>{product.title}</h2>
          <p className="muted">{product.category}</p>
          <p className="item-desc">{product.description}</p>
          <p className="detail-price">${product.price}</p>

            <div className="item-detail__actions">
            <div className="qty-control">
              <button className="btn" onClick={sub} aria-label="Disminuir">-</button>
              <input value={qty} readOnly aria-label="Cantidad" />
              <button className="btn btn--primary" onClick={add} aria-label="Aumentar">+</button>
            </div>
            <button className="btn btn--primary" onClick={() => { addItem(product, qty); toast.success(`${qty} × ${product.title} agregado`); }}>Agregar al carrito</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ItemDetail
