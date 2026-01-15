import React from 'react'
import './ItemListC.css'
import ItemList from '../ItemList/ItemList.jsx'
import { useParams } from 'react-router-dom'
import { getProductsFirestore } from '../../services/firestoreService'
import { useCargar } from '../ItemCount/ItemCount'

const ItemListContainer = ({ texto }) => {
  const { categoryId } = useParams()
  const { datos: items, cargando: loading, error } = useCargar(
    () => getProductsFirestore(categoryId),
    categoryId
  )

  return (
    <main className='main-container'>
      <h1 className='main-title'>{texto}</h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p style={{ color: 'crimson' }}>Error cargando productos. Intenta recargar la página.</p>
      ) : (
        <ItemList items={items || []} />
      )}
    </main>
  )
}

export default ItemListContainer