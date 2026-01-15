import './App.css'
import BarraNavegacion from './Components/navBar/navBar.jsx'
import ContenedorCatalogo from './Components/itemListContainer/itemListContainer.jsx'
import ContenedorDetalleProducto from './Components/ItemDetailContainer/ItemDetailContainer.jsx'
import PaginaCarrito from './Components/Cart/CartPage.jsx'
import PaginaCheckout from './Components/Checkout/Checkout.jsx'
import PaginaRestockeo from './Components/Restock/Restock.jsx'
import PiePagina from './Components/Footer/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import React from 'react'

function PaginaNoEncontrada() {
  return (
    <main style={{ padding: 20 }}>
      <h2>404 - Página no encontrada</h2>
      <p>Revisa el enlace o vuelve al inicio.</p>
    </main>
  )
}

function App() {
  return (
    <div className="app-root">
      <BarraNavegacion logo="Lucuman" />

      <main className="app-container page" role="main">
        <Routes>
          <Route path="/" element={<ContenedorCatalogo texto="Catálogo" />} />
          <Route path="/category/:categoryId" element={<ContenedorCatalogo texto="Catálogo por categoría" />} />
          <Route path="/item/:itemId" element={<ContenedorDetalleProducto />} />
          <Route path="/cart" element={<PaginaCarrito />} />
          <Route path="/checkout" element={<PaginaCheckout />} />
          <Route path="/restock" element={<PaginaRestockeo />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>

      <PiePagina />
    </div>
  )
}

export default App
