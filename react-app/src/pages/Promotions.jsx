import PromoCard from '../components/PromoCard.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { PRODUCTS } from '../data/catalog.js'

export default function Promotions() {
 return (<><section className="section">
<div className="container">
<h1 className="section-title">{"Promociones dulces"}</h1>
<p className="section-sub">{"Pequeños placeres con descuentos enormes. Cambian cada semana."}</p>
<div className="promo-grid">
<PromoCard tag={"2x1"} title={"Martes Rosados"} description={"Dos conos clásicos al precio de uno todos los martes."} price={"Bs3.50"} oldPrice={"Bs7.00"} tone={""} />
<PromoCard tag={"Combo familiar"} title={"Cuarteto Relax"} description={"4 bolas a elección + 4 mini conos. Perfecto para compartir."} price={"Bs12.90"} oldPrice={"Bs16.00"} tone={"blue"} />
<PromoCard tag={"Edición limitada"} title={"Sweet Dreams"} description={"Swirl pastel con destellos comestibles. Solo este mes."} price={"BS5.90"} tone={"purple"} />
<PromoCard tag={"Combo dúo"} title={"Slowpoke para dos"} description={"Sundae Rosado + Milkshake de fresa."} price={"Bs8.90"} oldPrice={"Bs10.00"} tone={""} />
<PromoCard tag={"Happy hour"} title={"De 4 a 6 pm"} description={"20% de descuento en todos los helados premium."} price={"-20%"} tone={"blue"} />
<PromoCard tag={"Estacional"} title={"Otoño Cálido"} description={"Calabaza otoñal con un toque de canela artesanal."} price={"Bs4.30"} tone={"purple"} />
</div>
</div>
</section><section className="section" style={{"background": "var(--pink-50)"}}>
<div className="container">
<h2 className="section-title">{"Productos destacados"}</h2>
<p className="section-sub">{"Los más amados por nuestros clientes."}</p>
<ProductGrid id="bestGrid" products={[PRODUCTS[0], PRODUCTS[3], PRODUCTS[8], PRODUCTS[15]]} />
</div>
</section></>)
}
