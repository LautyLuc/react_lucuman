import './App.css'
import NavBar from './Components/navBar/navBar.jsx'
import ItemListContainer from './Components/itemListContainer/itemListContainer.jsx'
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer.jsx'
import CartPage from './Components/Cart/CartPage.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import React from 'react'

function NotFound() {
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
      <NavBar logo="Lucuman" />

      <main className="app-container page" role="main">
        <Routes>
          <Route path="/" element={<ItemListContainer texto="Catalogo" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer texto="Catálogo por categoría" />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

  <Footer />
    </div>
  )
}

export default App
