import React from 'react'
import './ItemDetail.css'
import { useCart } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import { productImageUrl } from '../../services/imageService'
import { IndicadorDisponibilidad } from '../Item/Item'

const ItemDetail = ({ product }) => {
  const { addItem } = useCart()
  const placeholder = productImageUrl(product, 640, 640)
  const [addedQty, setAddedQty] = React.useState(0)

  const handleAdd = (qty) => {
    addItem(product, qty)
    setAddedQty(qty)
  }

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
          <p className="muted">Stock disponible: <strong>{product.stock}</strong></p>
          <p><IndicadorDisponibilidad stock={product.stock} /></p>

          <div className="item-detail__actions">
            {addedQty > 0 ? (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div>Se agregaron <strong>{addedQty}</strong> unidad(es).</div>
                <a href="/cart" className="btn">Ir al carrito</a>
                <a href="/" className="btn">Seguir comprando</a>
              </div>
            ) : (
              product.stock > 0 ? (
                <ItemCount stock={product.stock ?? 99} initial={1} onAdd={handleAdd} />
              ) : (
                <button className="btn" disabled>Agotado</button>
              )
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ItemDetail
