

export default function About() {
 return (<><section className="section">
<div className="container about-grid">
<div>
<h1 style={{"fontSize": "clamp(2rem,3.5vw,3rem)"}}>{"Una pausa dulce"}<br />{"en un mundo apurado."}</h1>
<p style={{"color": "var(--ink-soft)", "fontSize": "1.1rem"}}>{"Heladería Slowpoke nació en 2018 con una idea simple: hacer helados con calma, ingredientes reales y mucho cariño. Nuestro nombre celebra ese ritmo relajado que tanto nos gusta defender."}</p>
<p style={{"color": "var(--ink-soft)"}}>{"Trabajamos con leche fresca local, fruta de temporada y recetas que perfeccionamos lote a lote. Cada cono es una pequeña invitación a tomarte un respiro."}</p>
<a className="btn btn-primary" href="menu.html">{"Conocer el menú"}</a>
</div>
<img src="assets/images/mascot-hero.png" alt="Mascota Slowpoke" style={{"background": "radial-gradient(circle, var(--pink-100), transparent 70%)", "padding": "20px"}} />
</div>
</section><section className="section" style={{"background": "var(--pink-50)"}}>
<div className="container">
<h2 className="section-title">{"Nuestra misión y valores"}</h2>
<p className="section-sub">{"Cuatro principios que guían cada cono que servimos."}</p>
<div className="values">
<div className="value"><div className="ico">{"🌱"}</div><h4>{"Ingredientes naturales"}</h4><p>{"Sin colorantes artificiales ni conservantes. Solo cosas reales."}</p></div>
<div className="value"><div className="ico">{"🤝"}</div><h4>{"Comunidad local"}</h4><p>{"Compramos a productores locales y devolvemos lo recibido."}</p></div>
<div className="value"><div className="ico">{"😌"}</div><h4>{"Hecho con calma"}</h4><p>{"El buen sabor toma tiempo. Nosotros no tenemos prisa."}</p></div>
<div className="value"><div className="ico">{"💗"}</div><h4>{"Momentos felices"}</h4><p>{"Cada visita debería sentirse como un mini día libre."}</p></div>
</div>
</div>
</section><section className="section">
<div className="container" style={{"maxWidth": "780px", "textAlign": "center"}}>
<h2 className="section-title">{"Nuestra filosofía"}</h2>
<p style={{"color": "var(--ink-soft)", "fontSize": "1.1rem"}}>{"Creemos que el helado es más que un postre: es una pausa, un mimo, un recuerdo de infancia. Por eso diseñamos cada sabor para que se sienta como un abrazo. Lento, suave y reconfortante. Como nuestra mascota."}</p>
</div>
</section></>)
}
