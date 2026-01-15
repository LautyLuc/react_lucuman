import React from 'react'
import { useParams } from 'react-router-dom'
import { getProductByIdFirestore } from '../../services/firestoreService'
import { useCargar } from '../ItemCount/ItemCount'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'

const ItemDetailContainer = () => {
  const { itemId } = useParams()
  const { datos: product, cargando: loading } = useCargar(
    () => getProductByIdFirestore(itemId),
    itemId
  )

  if (loading) return <main style={{ padding: 20 }}><p>Cargando detalle...</p></main>
  if (!product) return <main style={{ padding: 20 }}><p>Producto no encontrado</p></main>

  return (
    <main style={{ padding: 20 }}>
      <ItemDetail product={product} />
    </main>
  )
}

export default ItemDetailContainer
