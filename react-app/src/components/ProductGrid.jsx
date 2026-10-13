import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, id, query = '' }) {
  return <div className="product-grid" id={id}>{products.length ? products.map(product => <ProductCard key={product.id} product={product} />) :
    <div className="empty-state" style={{ gridColumn: '1/-1' }}><strong>Sin resultados</strong><p>No encontramos helados para "{query}". Prueba otra búsqueda.</p></div>}
  </div>
}
