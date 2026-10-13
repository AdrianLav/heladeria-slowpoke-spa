import { useState } from 'react'
import { useShop } from '../state/ShopContext.js'
const links = [['index.html', 'Inicio'], ['menu.html', 'Menú'], ['promociones.html', 'Promociones'], ['nosotros.html', 'Nosotros'], ['contacto.html', 'Contacto']]
export default function Header({ page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme, count, setCartOpen } = useShop()
  return <header className="nav"><div className="container nav-inner">
    <a className="brand" href="index.html"><img src="assets/images/logo.png" alt="Logo Heladería Slowpoke" /><span>Heladería <em>Slowpoke</em></span></a>
    <nav className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks" aria-label="Navegación principal">
      {links.map(([href, label]) => <a key={href} href={href} className={href === page ? 'active' : ''} aria-current={href === page ? 'page' : undefined}>{label}</a>)}
    </nav>
    <div className="nav-actions">
      <button className="icon-btn" id="themeToggle" aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} title="Modo claro / oscuro" onClick={toggleTheme}>
        <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      </button>
      <button className="icon-btn" id="openCart" aria-label="Abrir carrito" onClick={() => setCartOpen(true)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h15l-1.5 9h-12z" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M6 6L5 3H2" /></svg>
        <span className="badge" id="cartCount" hidden={!count}>{count}</span>
      </button>
      <button className="menu-toggle" id="menuToggle" aria-label="Menú" aria-expanded={menuOpen} aria-controls="navLinks" onClick={() => setMenuOpen(open => !open)}><span /></button>
    </div>
  </div></header>
}
