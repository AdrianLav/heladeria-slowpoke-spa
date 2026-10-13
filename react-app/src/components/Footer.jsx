const year = new Date().getFullYear()
export function Footer({ home }) { return (<footer className="footer">
<div className="container footer-grid">
<div>
<div className="brand" style={{"color": "white"}}><img src="assets/images/logo.png" alt="" style={{"width": "40px", "height": "40px"}} />
<span>{"Heladería "}<em style={{"color": "var(--pink-300)"}}>{"Slowpoke"}</em></span></div>
<p style={{"marginTop": "12px", "maxWidth": "300px"}}>{home ? 'Helados artesanales hechos con calma. Una pausa dulce, todos los días.' : 'Helados artesanales hechos con calma.'}</p>
</div>
<div><h4>{"Explorar"}</h4><ul><li><a href="menu.html">{"Menú"}</a></li><li><a href="promociones.html">{"Promociones"}</a></li><li><a href="nosotros.html">{"Nosotros"}</a></li><li><a href="contacto.html">{"Contacto"}</a></li></ul></div>
<div><h4>{"Visítanos"}</h4><ul><li>{"Av. Helados 123, Centro"}</li><li>{"Lun–Dom · 11:00 – 22:00"}</li><li>{"+1 (555) 010-1234"}</li></ul></div>
<div><h4>{"Síguenos"}</h4><ul><li><a href="#">{"Instagram"}</a></li><li><a href="#">{"TikTok"}</a></li><li><a href="#">{"Facebook"}</a></li></ul></div>
</div>
<div className="footer-bottom">{"© "}<span className="year">{year}</span>{" Heladería Slowpoke · Hecho con cariño 🍓"}</div>
</footer>) }
