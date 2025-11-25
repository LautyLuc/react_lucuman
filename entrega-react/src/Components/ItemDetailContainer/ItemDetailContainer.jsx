import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../products'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'

const ItemDetailContainer = () => {
  const { itemId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProductById(itemId)
      .then(p => setProduct(p))
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading) return <main style={{ padding: 20 }}><p>Cargando detalle...</p></main>
  if (!product) return <main style={{ padding: 20 }}><p>Producto no encontrado</p></main>

  return (
    <main style={{ padding: 20 }}>
      <ItemDetail product={product} />
    </main>
  )
}

export default ItemDetailContainer
