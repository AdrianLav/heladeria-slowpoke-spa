import { useState } from 'react'
import { CATEGORIES } from '../data/catalog.js'
import { filterProducts } from '../lib/shop.js'
import ProductGrid from '../components/ProductGrid.jsx'
export default function Menu() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  return <section className="section"><div className="container">
    <h1 className="section-title">Nuestro menú</h1><p className="section-sub">15+ sabores artesanales, batidos con calma para ti.</p>
    <div className="menu-toolbar"><div className="search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
      <input id="search" type="search" placeholder="Buscar un sabor..." aria-label="Buscar producto" value={query} onChange={e => setQuery(e.target.value)} />
    </div><div className="filters" id="filters">{CATEGORIES.map(c => <button key={c.id} className={`chip ${category === c.id ? 'active' : ''}`} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{c.label}</button>)}</div></div>
    <ProductGrid id="productGrid" products={filterProducts(query, category)} query={query.trim().toLowerCase() || category} />
  </div></section>
}
