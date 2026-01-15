import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './animations.css'
import App from './App.jsx'
import { ProveedorCarrito } from './context/CartContext'
import { ProveedorTema } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProveedorTema>
        <ProveedorCarrito>
          <App />
        </ProveedorCarrito>
      </ProveedorTema>
    </BrowserRouter>
  </StrictMode>,
)
