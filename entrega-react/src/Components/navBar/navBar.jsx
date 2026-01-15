import React from 'react'
import './navBar.css'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { usarTema } from '../../context/ThemeContext'

const CartIconoSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 21 21"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 6.5h12.5l-1.586 5.55a2 2 0 0 1-1.923 1.45h-6.7a2 2 0 0 1-1.989-1.78L4.5 4.5h-2"
      ></path>
      <g fill="currentColor" transform="translate(2 4)">
        <circle cx="5" cy="12" r="1"></circle>
        <circle cx="13" cy="12" r="1"></circle>
      </g>
    </g>
  </svg>
)

function BotonTema() {
  const { tema, alternarTema } = usarTema()
  return (
    <button 
      aria-label="Alternar tema" 
      className="theme-toggle-btn" 
      onClick={alternarTema}
      title={`Cambiar a tema ${tema === 'oscuro' ? 'claro' : 'oscuro'}`}
    >
      {tema === 'oscuro' ? '☀️' : '🌙'}
    </button>
  )
}

function CarritoWidget() {
  const { getTotalCount } = useCart()
  return (
    <Link to="/cart" className="cart-btn" aria-label="Ver carrito" title="Ver carrito de compras">
      <CartIconoSvg width={24} height={24} style={{ color: 'currentColor' }} />
      {getTotalCount() > 0 && <span className="cart-badge">{getTotalCount()}</span>}
    </Link>
  )
}

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
            <li className="site-nav__item">
              <NavLink to="/restock" className={({isActive}) => isActive ? 'active' : ''}>Restock</NavLink>
            </li>
          </ul>
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
            <BotonTema />
            <CarritoWidget />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar