import React, { useState, useEffect } from 'react'
import { firebaseConfigured } from '../../firebaseConfig'

function useCargar(fetchFn, dependencia) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setCargando(true)
    setError(false)
    if (!firebaseConfigured) {
      setError(true)
      setCargando(false)
      return
    }
    fetchFn()
      .then(setDatos)
      .catch(() => setError(true))
      .finally(() => setCargando(false))
  }, [dependencia])

  return { datos, cargando, error }
}

const ItemCount = ({ stock = 10, initial = 1, onAdd }) => {
  const [qty, setQty] = useState(() => Math.max(1, Math.min(initial, stock)))

  const increase = () => setQty(q => Math.min(stock, q + 1))
  const decrease = () => setQty(q => Math.max(1, q - 1))

  return (
    <div className="item-count">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="btn" onClick={decrease} aria-label="Disminuir">-</button>
        <input value={qty} readOnly aria-label="Cantidad" style={{ width: 48, textAlign: 'center' }} />
        <button className="btn btn--primary" onClick={increase} aria-label="Aumentar">+</button>
      </div>

      <div style={{ marginTop: 8 }}>
        <button className="btn btn--primary" onClick={() => onAdd(qty)}>Agregar al carrito</button>
      </div>
    </div>
  )
}

export { useCargar }
export default ItemCount
