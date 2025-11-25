
import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({ product }) => {
  return (
    <article className="item-card">
      <div className="item-media">
        <img src={`https://picsum.photos/seed/${product.id}/600/400`} alt={product.title} />
      </div>

      <h3>{product.title}</h3>
      <p className="item-price">${product.price}</p>
      <p className="item-category">{product.category}</p>
      <p className="item-desc">{product.description}</p>
      <Link to={`/item/${product.id}`} className="item-link">Ver detalle</Link>
    </article>
  )
}

export default Item
