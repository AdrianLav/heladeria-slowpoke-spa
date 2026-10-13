import Reveal from '../components/Reveal.jsx'
import PromoCard from '../components/PromoCard.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { PRODUCTS } from '../data/catalog.js'

export default function Home() {
 return (<><section className="hero">
<div className="container hero-grid">
<div>
<span className="hero-eyebrow">{"Helados artesanales · desde 2018"}</span>
<h1>{"Los helados más "}<em>{"relajados"}</em><br />{"y deliciosos de la ciudad."}</h1>
<p className="lead">{"Sabores hechos con calma, ingredientes naturales y mucho cariño. Una pausa dulce para los días ocupados."}</p>
<div className="hero-ctas">
<a className="btn btn-primary" href="menu.html">{"Ver el menú 🍦"}</a>
<a className="btn btn-ghost" href="promociones.html">{"Promos del mes"}</a>
</div>
<div className="hero-stats">
<div><strong>{"35+"}</strong><span>{"Sabores"}</span></div>
<div><strong>{"4.9★"}</strong><span>{"Calificación"}</span></div>
<div><strong>{"10K+"}</strong><span>{"Clientes felices"}</span></div>
</div>
</div>
<div className="hero-art">
<img src="assets/images/mascot-hero.png" alt="Mascota Slowpoke con cono de helado" />
</div>
</div>
</section><section className="section">
<div className="container">
<Reveal className="section-title" as="h2">{"Sabores destacados"}</Reveal>
<Reveal className="section-sub" as="p">{"Los favoritos de la casa, recién batidos esta semana."}</Reveal>
<Reveal><ProductGrid id="featuredGrid" products={PRODUCTS.slice(0, 4)} /></Reveal>
</div>
</section><section className="section" style={{"background": "linear-gradient(180deg, transparent, var(--pink-50))"}}>
<div className="container">
<Reveal className="section-title" as="h2">{"Promociones de la semana"}</Reveal>
<Reveal className="section-sub" as="p">{"Pequeños placeres que se sienten enormes."}</Reveal>
<Reveal className="promo-grid" as="div">
<PromoCard tag={"2x1"} title={"Martes Rosados"} description={"Lleva dos conos clásicos al precio de uno. Solo los martes."} price={"$3.50"} oldPrice={"$7.00"} tone={""} />
<PromoCard tag={"Combo"} title={"Combo Slowpoke"} description={"Sundae Rosado + Milkshake de fresa, perfecto para compartir."} price={"$8.90"} oldPrice={"$10.00"} tone={"blue"} />
<PromoCard tag={"Edición"} title={"Sweet Dreams"} description={"Edición limitada con swirl pastel y destellos comestibles."} price={"$5.90"} tone={"purple"} />
</Reveal>
</div>
</section><section className="section">
<div className="container">
<Reveal className="section-title" as="h2">{"Lo que dicen nuestros clientes"}</Reveal>
<Reveal className="section-sub" as="p">{"Historias dulces que nos hacen sonreír."}</Reveal>
<Reveal className="testi-grid" as="div">
<div className="testi">
<div className="stars">{"★★★★★"}</div>
<p>{"\"El mejor helado de fresa que he probado. La mascota es adorable y el local es súper relajante.\""}</p>
<div className="who"><div className="avatar">{"MR"}</div><div><strong>{"María Rivera"}</strong><small>{"Cliente frecuente"}</small></div></div>
</div>
<div className="testi">
<div className="stars">{"★★★★★"}</div>
<p>{"\"Vengo cada fin de semana con mis hijos. La Edición Sweet Dreams se convirtió en nuestra favorita.\""}</p>
<div className="who"><div className="avatar">{"JC"}</div><div><strong>{"Juan Castillo"}</strong><small>{"Papá feliz"}</small></div></div>
</div>
<div className="testi">
<div className="stars">{"★★★★★"}</div>
<p>{"\"Atención cálida, sabores únicos y ese ambiente cozy que necesitaba. Mi nuevo lugar favorito.\""}</p>
<div className="who"><div className="avatar">{"LP"}</div><div><strong>{"Lucía Paredes"}</strong><small>{"Foodie"}</small></div></div>
</div>
</Reveal>
</div>
</section><section className="section" style={{"background": "var(--pink-50)"}}>
<div className="container">
<Reveal className="section-title" as="h2">{"Los más vendidos"}</Reveal>
<Reveal className="section-sub" as="p">{"Los favoritos absolutos del último mes."}</Reveal>
<Reveal><ProductGrid id="bestGrid" products={[PRODUCTS[0], PRODUCTS[3], PRODUCTS[8], PRODUCTS[15]]} /></Reveal>
</div>
</section></>)
}
