import React from 'react'
import './Footer.css'

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__container">
      <p>© {new Date().getFullYear()} Lucuman — Proyecto de entrega</p>
    </div>
  </footer>
)

export default Footer
