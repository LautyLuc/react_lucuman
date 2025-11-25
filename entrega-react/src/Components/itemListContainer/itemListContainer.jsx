
import React, { useEffect, useState } from 'react'
import './ItemListC.css'
import ItemList from '../ItemList/ItemList.jsx'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../products'
import { toast } from 'react-toastify'

const ItemListContainer = ({ texto }) => {
  const { categoryId } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProducts()
      .then((all) => {
        if (categoryId) {
          setItems(all.filter(i => i.category === categoryId))
        } else {
          setItems(all)
        }
        toast.dismiss()
      })
      .catch(() => toast.error('Error cargando productos'))
      .finally(() => setLoading(false))
  }, [categoryId])

  return (
    <main className='main-container'>
      <h1 className='main-title'>{texto}</h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList items={items} />
      )}
    </main>
  )
}

export default ItemListContainer