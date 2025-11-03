import React from 'react'
import CartWidget from '../cartWidget/cartWidget.jsx'
import './navBar.css'

const NavBar = ({ logo }) => {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__brand">
          <h2 className="site-header__logo">{logo}</h2>
        </div>

        <nav className="site-header__nav">
          <ul className="site-nav__list">
            <li className="site-nav__item">Inicio</li>
            <li className="site-nav__item">Productos</li>
            <li className="site-nav__item">Contacto</li>
          </ul>
          <CartWidget />
        </nav>
      </div>
    </header>
  )
}

export default NavBar