
import React from 'react'
import './ItemListC.css'

const ItemListContainer = ({texto}) => {
  return (
    <main className='main-container'>
        <h1 className='main-title'>{texto}</h1>
    </main>
  )
}

export default ItemListContainer