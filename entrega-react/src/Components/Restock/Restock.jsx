import React, { useEffect, useState } from 'react'
import { getProductsFirestore, restockProduct } from '../../services/firestoreService'
import './Restock.css'

const Restock = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState({})

  useEffect(() => {
    setLoading(true)
    getProductsFirestore()
      .then(setItems)
      .catch(err => setError('Error cargando productos'))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (id, value) => {
    setEditing(e => ({ ...e, [id]: value }))
  }

  const handleSave = async (id) => {
    const val = Number(editing[id])
    if (Number.isNaN(val) || val < 0) return alert('Cantidad inválida')
    try {
      await restockProduct(id, val)
      // update local list
      setItems(it => it.map(p => p.id === id ? { ...p, stock: val, raw: { ...p.raw, cant: val, Disponible: val>0 } } : p))
      setEditing(e => { const n = { ...e }; delete n[id]; return n })
      alert('Stock actualizado')
    } catch (err) {
      console.error(err)
      alert('Error actualizando stock')
    }
  }

  if (loading) return <main style={{ padding: 20 }}><p>Cargando productos...</p></main>
  if (error) return <main style={{ padding: 20 }}><p style={{ color: 'crimson' }}>{error}</p></main>

  return (
    <main style={{ padding: 20 }}>
      <h2>Restockear productos</h2>
      <p>Modifica la cantidad (`cant`) y disponibilidad de cada producto.</p>
      <div className="restock-grid">
        {items.map(p => (
          <div className="restock-card card" key={p.id}>
            <h3>{p.title}</h3>
            <p className="muted">{p.category}</p>
            <p>Stock actual: <strong>{p.stock}</strong></p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input type="number" min="0" value={editing[p.id] ?? p.stock} onChange={e => handleChange(p.id, e.target.value)} />
              <button className="btn btn--primary" onClick={() => handleSave(p.id)}>Guardar</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Restock
