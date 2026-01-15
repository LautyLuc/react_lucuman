import React, { createContext, useContext, useEffect, useState } from 'react'

const ContextoTema = createContext()

export const ProveedorTema = ({ children }) => {
  const [tema, establecerTema] = useState(() => {
    try {
      const guardado = localStorage.getItem('tema')
      return guardado === 'oscuro' ? 'oscuro' : 'claro'
    } catch (e) {
      return 'claro'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('tema', tema)
    } catch (e) {}
    
    // Aplicar tema a documento
    const clase = 'tema-oscuro'
    const htmlElement = document.documentElement
    
    if (tema === 'oscuro') {
      htmlElement.classList.add(clase)
      htmlElement.setAttribute('data-theme', 'dark')
    } else {
      htmlElement.classList.remove(clase)
      htmlElement.setAttribute('data-theme', 'light')
    }
  }, [tema])

  const alternarTema = () => establecerTema(t => (t === 'oscuro' ? 'claro' : 'oscuro'))

  return (
    <ContextoTema.Provider value={{
      tema,
      alternarTema,
      theme: tema,
      toggleTheme: alternarTema
    }}>
      {children}
    </ContextoTema.Provider>
  )
}

export const usarTema = () => {
  const ctx = useContext(ContextoTema)
  if (!ctx) throw new Error('usarTema debe usarse dentro de ProveedorTema')
  return ctx
}

export const useTheme = usarTema

export default ContextoTema
