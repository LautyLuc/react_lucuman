import React from 'react'
import './Footer.css'
import ComprasMeter from '../ComprasMeter/ComprasMeter'

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <p>© {new Date().getFullYear()} Lucuman — Proyecto de entrega</p>
        <ComprasMeter />
      </div>
    </div>
  </footer>
)

export default Footer
