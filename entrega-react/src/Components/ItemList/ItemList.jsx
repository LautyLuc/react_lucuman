import React from 'react'
import Item from '../Item/Item.jsx'
import './ItemList.css'

const ItemList = ({ items = [] }) => {
  if (!items.length) return <p>No hay productos para mostrar.</p>

  return (
    <section className="item-list">
      {items.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ItemList
