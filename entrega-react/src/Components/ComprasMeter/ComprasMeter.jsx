import React, { useState, useEffect } from 'react'
import { getOrderCount } from '../../services/firestoreService'

export function ComprasMeter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarContador = async () => {
      try {
        const total = await getOrderCount()
        setCount(total)
      } catch (e) {
        console.error('Error cargando contador de compras:', e)
      } finally {
        setLoading(false)
      }
    }

    cargarContador()
    
    // Recargar cada 10 segundos para ver cambios en tiempo real
    const interval = setInterval(cargarContador, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <span>Cargando...</span>

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      background: 'var(--accent-light)',
      color: 'var(--accent)',
      fontWeight: '600',
      fontSize: '0.9rem'
    }}>
      <span>🛍️</span>
      <span>{count} {count === 1 ? 'compra' : 'compras'}</span>
    </div>
  )
}

export default ComprasMeter
