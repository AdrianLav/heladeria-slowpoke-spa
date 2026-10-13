import { CATEGORIES } from '../data/catalog.js'
import { formatPrice } from '../lib/shop.js'
import { useShop } from '../state/ShopContext.js'

export default function ProductCard({ product }) {
  const { favs, toggleFav, addToCart } = useShop()
  const favorite = favs.includes(product.id)
  return <article className="product-card" data-cat={product.cat}>
    <button className={`fav-btn ${favorite ? 'active' : ''}`} aria-label={`${favorite ? 'Quitar' : 'Marcar'} favorito: ${product.name}`} aria-pressed={favorite} onClick={() => toggleFav(product.id)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" /></svg>
    </button>
    <div className="thumb"><img src={product.img} alt={product.name} loading="lazy" /></div>
    <div className="body"><span className="cat">{CATEGORIES.find(category => category.id === product.cat)?.label}</span><h3>{product.name}</h3><p className="desc">{product.desc}</p>
      <div className="row"><span className="price">{formatPrice(product.price)}</span><button className="btn btn-primary btn-sm" onClick={() => addToCart(product.id)}>Añadir</button></div>
    </div>
  </article>
}