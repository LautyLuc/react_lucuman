
import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'
import { productImageUrl } from '../../services/imageService'

export function IndicadorDisponibilidad({ stock }) {
  return (
    <span>
      {stock > 0 ? (
        <span style={{ color: '#16a34a' }}>Disponible</span>
      ) : (
        <span style={{ color: 'crimson' }}>No disponible</span>
      )}
    </span>
  )
}

const Item = ({ product }) => {
  return (
    <article className="item-card">
      <div className="item-media">
        <img src={productImageUrl(product, 600, 400)} alt={product.title} />
      </div>

      <h3>{product.title}</h3>
      <p className="item-price">${product.price}</p>
      <p className="item-category">{product.category}</p>
      <p className="item-desc">{product.description}</p>
      <p className="muted">Stock: <strong>{product.stock}</strong> — <IndicadorDisponibilidad stock={product.stock} /></p>
      <Link to={`/item/${product.id}`} className="item-link">Ver detalle</Link>
    </article>
  )
}

export default Item
