import ContactForm from '../components/ContactForm.jsx'

export default function Contact() {
 return (<><section className="section">
<div className="container">
<h1 className="section-title">{"Hablemos 🍓"}</h1>
<p className="section-sub">{"¿Una sugerencia, una pregunta o un pedido especial? Cuéntanos."}</p>
<div className="contact-grid">
<ContactForm />
<aside className="info-card">
<h3>{"Visítanos"}</h3>
<ul className="info-list">
<li><span className="ico">{"📍"}</span><div><strong>{"Dirección"}</strong><br /><span style={{"color": "var(--ink-soft)"}}>{"Av. Helados 123, Centro"}</span></div></li>
<li><span className="ico">{"🕒"}</span><div><strong>{"Horario"}</strong><br /><span style={{"color": "var(--ink-soft)"}}>{"Lunes a Domingo"}<br />{"11:00 – 22:00"}</span></div></li>
<li><span className="ico">{"📞"}</span><div><strong>{"Teléfono"}</strong><br /><span style={{"color": "var(--ink-soft)"}}>{"+1 (555) 010-1234"}</span></div></li>
<li><span className="ico">{"✉️"}</span><div><strong>{"Email"}</strong><br /><span style={{"color": "var(--ink-soft)"}}>{"hola@slowpoke.cafe"}</span></div></li>
</ul>
<div className="map" aria-label="Mapa de ubicación"></div>
</aside>
</div>
</div>
</section></>)
}
