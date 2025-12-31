import React from 'react'
import { useLocation } from 'react-router-dom'
import Link from './Link'
import logoImg from '../../LOGO MAIN MAIN.png'

export default function Header() {
  const location = useLocation()
  const isIzradaSajtova = location.pathname === '/izrada-sajtova/'
  const logoColor = isIzradaSajtova ? '#ffffff' : '#000000'

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logoImg} alt="SEO Mačak" width="60" height="60" style={{ display: 'block', objectFit: 'contain' }} />
          <span className="logo-text" style={{ color: logoColor, textDecoration: 'underline', textDecorationColor: logoColor, textDecorationThickness: '2px' }}>
            SEO<br/>
            <span className="logo-sub" style={{ color: logoColor }}>
              Mačak.
            </span>
          </span>
        </Link>
        <nav className="nav-pill">
          <Link to="/">Početna</Link>
          <Link to="/izrada-sajtova/">Izrada sajtova</Link>
          <Link to="/seo/">SEO</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/about/">O nama</Link>
          <Link to="/kontakt/" className="btn nav-cta">Kontakt</Link>
        </nav>
      </div>
    </header>
  )
}