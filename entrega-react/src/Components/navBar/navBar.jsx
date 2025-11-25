import React from 'react'
import CartWidget from '../cartWidget/cartWidget.jsx'
import './navBar.css'
import { Link, NavLink } from 'react-router-dom'

const NavBar = ({ logo }) => {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__brand">
          <h2 className="site-header__logo">{logo}</h2>
        </div>

        <nav className="site-header__nav">
          <ul className="site-nav__list">
            <li className="site-nav__item">
              <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Inicio</NavLink>
            </li>
            <li className="site-nav__item">
              <NavLink to="/category/remeras" className={({isActive}) => isActive ? 'active' : ''}>Remeras</NavLink>
            </li>
            <li className="site-nav__item">
              <NavLink to="/category/pantalones" className={({isActive}) => isActive ? 'active' : ''}>Pantalones</NavLink>
            </li>
            <li className="site-nav__item">
              <NavLink to="/category/accesorios" className={({isActive}) => isActive ? 'active' : ''}>Accesorios</NavLink>
            </li>
          </ul>
          <CartWidget />
        </nav>
      </div>
    </header>
  )
}

export default NavBar