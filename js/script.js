/* =============================================================
   Heladería Slowpoke — JavaScript principal (Vanilla JS)
   Funcionalidades: catálogo dinámico, carrito (LocalStorage),
   búsqueda en tiempo real, filtros, favoritos y validación.
   ============================================================= */

/* ---------------- Catálogo de productos ---------------- */
const PRODUCTS = [
  { id: 'p1',  name: 'Helado Fresa Slowpoke',     cat: 'clasicos',  price: 24.00, img: 'assets/images/p-fresa.jpg',         desc: 'Cremoso helado de fresa con trozos reales de fruta. Suave y dulce.' },
  { id: 'p2',  name: 'Helado Vainilla Relax',     cat: 'clasicos',  price: 22.00, img: 'assets/images/p-vainilla.jpg',        desc: 'Vainilla de Madagascar batida lentamente para una textura sedosa.' },
  { id: 'p3',  name: 'Helado Frutos del Bosque',  cat: 'frutales',  price: 26.00, img: 'assets/images/p-frutos.jpg',         desc: 'Mezcla de moras, arándanos y frambuesas en una base láctea.' },
  { id: 'p4',  name: 'Sundae Rosado',             cat: 'especiales',price: 38.00, img: 'assets/images/p-sundae.jpg',         desc: 'Sundae de fresa con crema batida, sirope y grageas pastel.' },
  { id: 'p5',  name: 'Banana Split Slowpoke',     cat: 'especiales',price: 48.00, img: 'assets/images/p-banana.jpg',         desc: 'Tres bolas, plátano, caramelo y cerezas. El clásico reinventado.' },
  { id: 'p6',  name: 'Milkshake de Fresa',        cat: 'especiales',price: 31.00, img: 'assets/images/p-milkshake.jpg',      desc: 'Batido espeso de fresa con crema y nuestra firma rosa.' },
  { id: 'p7',  name: 'Copa Tropical',             cat: 'frutales',  price: 36.00, img: 'assets/images/p-tropical.jpg',        desc: 'Mango, piña y coco en una copa fresca y vibrante.' },
  { id: 'p8',  name: 'Helado Premium de Chocolate', cat: 'premium', price: 33.00, img: 'assets/images/p-chocolate.jpg',       desc: 'Chocolate belga 70% con virutas finas. Intenso y aterciopelado.' },
  { id: 'p9',  name: 'Helado Arcoíris',           cat: 'especiales',price: 29.00, img: 'assets/images/p-arcoiris.jpg',        desc: 'Cinco sabores en una sola copa: fresa, vainilla, limón, menta y mango.' },
  { id: 'p10', name: 'Edición Sweet Dreams',      cat: 'temporales',price: 41.00, img: 'assets/images/p-sweetdreams.jpg',     desc: 'Swirl pastel de algodón de azúcar con destellos comestibles.' },
  { id: 'p11', name: 'Helado de Pistacho',        cat: 'premium',   price: 32.00, img: 'assets/images/p-pistacho.jpg',        desc: 'Pistachos sicilianos triturados a mano sobre base cremosa.' },
  { id: 'p12', name: 'Menta Chip',                cat: 'clasicos',  price: 25.00, img: 'assets/images/p-menta.jpg',           desc: 'Refrescante menta con chispas de chocolate amargo.' },
  { id: 'p13', name: 'Dulce de Leche Artesanal',  cat: 'premium',   price: 30.00, img: 'assets/images/p-dulce.jpg',           desc: 'Dulce de leche cocido a fuego lento, rico y reconfortante.' },
  { id: 'p14', name: 'Cookies & Cream',           cat: 'clasicos',  price: 27.00, img: 'assets/images/p-cookies.jpg',         desc: 'Crema dulce con generosos trozos de galleta de chocolate.' },
  { id: 'p15', name: 'Calabaza Otoñal',           cat: 'temporales',price: 30.00, img: 'assets/images/p-otono.jpg',           desc: 'Edición limitada de calabaza especiada con un toque de canela.' },
  { id: 'p16', name: 'Especial Slowpoke',         cat: 'especiales',price: 45.00, img: 'assets/images/p-slowpoke-special.jpg', desc: 'Nuestra creación insignia: rosa cremoso con corazón de fresa.' },
];

const CATEGORIES = [
  { id: 'all',        label: 'Todos' },
  { id: 'clasicos',  label: 'Clásicos' },
  { id: 'frutales',  label: 'Frutales' },
  { id: 'especiales',label: 'Especiales Slowpoke' },
  { id: 'premium',   label: 'Premium' },
  { id: 'temporales',label: 'Ediciones Temporales' },
];

/* ---------------- Estado persistente ---------------- */
const LS_CART = 'slowpoke_cart';
const LS_FAVS = 'slowpoke_favs';
const LS_ORDER = 'slowpoke_order';
const LS_ORDERNUM = 'slowpoke_order_num';
const LS_THEME = 'slowpoke_theme';

/* Personal que entrega el pedido (mesa y delivery) */
const STAFF = {
  mesa: [
    { name: 'Camila Rojas',   phone: '+591 70011223', role: 'Mesera' },
    { name: 'Iván Peredo',    phone: '+591 70022334', role: 'Mesero' },
    { name: 'Lucía Mendoza',  phone: '+591 70033445', role: 'Mesera' },
  ],
  llevar: [
    { name: 'Diego Terán',    phone: '+591 71544880', role: 'Repartidor' },
    { name: 'Marcela Vargas', phone: '+591 71655991', role: 'Repartidora' },
    { name: 'Alex Quiroga',   phone: '+591 71766002', role: 'Repartidor' },
  ],
};
const pickStaff = mode => {
  const lista = STAFF[mode] || STAFF.mesa;
  return lista[Math.floor(Math.random() * lista.length)];
};

const state = {
  cart: loadLS(LS_CART, {}),     // { id: qty }
  favs: loadLS(LS_FAVS, []),     // [id, ...]
  // Datos de entrega: modo (mesa | llevar) y a dónde irá el pedido
  order: loadLS(LS_ORDER, { mode: 'mesa', table: '', place: '', address: '', name: '' }),
  filter: 'all',
  query: '',
};

const appRoot = new URL('../', document.currentScript.src);
const routes = new Map([
  ['/', { id: 'home', file: 'index.html', title: 'Heladería Slowpoke — Los helados más relajados de la ciudad' }],
  ['/index.html', { id: 'home', file: 'index.html', title: 'Heladería Slowpoke — Los helados más relajados de la ciudad' }],
  ['/heladeria adruko.html', { id: 'home', file: 'index.html', title: 'Heladería Slowpoke — Los helados más relajados de la ciudad' }],
  ['/menu', { id: 'menu', file: 'menu.html', title: 'Menú — Heladería Slowpoke' }],
  ['/menu.html', { id: 'menu', file: 'menu.html', title: 'Menú — Heladería Slowpoke' }],
  ['/promociones', { id: 'promociones', file: 'promociones.html', title: 'Promociones — Heladería Slowpoke' }],
  ['/promociones.html', { id: 'promociones', file: 'promociones.html', title: 'Promociones — Heladería Slowpoke' }],
  ['/nosotros', { id: 'nosotros', file: 'nosotros.html', title: 'Nosotros — Heladería Slowpoke' }],
  ['/nosotros.html', { id: 'nosotros', file: 'nosotros.html', title: 'Nosotros — Heladería Slowpoke' }],
  ['/contacto', { id: 'contacto', file: 'contacto.html', title: 'Contacto — Heladería Slowpoke' }],
  ['/contacto.html', { id: 'contacto', file: 'contacto.html', title: 'Contacto — Heladería Slowpoke' }],
]);
let revealObserver;
let pendingRoute;

function loadLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function saveLS(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

/* ---------------- Helpers ---------------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// CAMBIO AQUÍ: Formateador ajustado para mostrar Bolivianos (Bs.)
const fmt = n => `Bs. ${n.toFixed(2)}`;

function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
function assetUrl(path) { return new URL(path, appRoot).href; }

function toast(msg) {
  let el = $('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 1800);
}

/* ---------------- Carrito ---------------- */
function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveLS(LS_CART, state.cart);
  updateCartUI();
  toast('Añadido al carrito 🍦');
}
function changeQty(id, delta) {
  state.cart[id] = (state.cart[id] || 0) + delta;
  if (state.cart[id] <= 0) delete state.cart[id];
  saveLS(LS_CART, state.cart);
  updateCartUI();
}
function removeFromCart(id) {
  delete state.cart[id];
  saveLS(LS_CART, state.cart);
  updateCartUI();
}
function cartCount() { return Object.values(state.cart).reduce((s, n) => s + n, 0); }
function cartTotal() {
  return Object.entries(state.cart).reduce((s, [id, q]) => {
    const p = getProduct(id); return p ? s + p.price * q : s;
  }, 0);
}

function updateCartUI() {
  const badge = $('#cartCount');
  if (badge) {
    const n = cartCount();
    badge.textContent = n;
    badge.style.display = n > 0 ? 'inline-flex' : 'none';
  }

  const body = $('#cartBody');
  if (!body) return;

  const entries = Object.entries(state.cart);
  if (entries.length === 0) {
    body.innerHTML = `<div class="cart-empty"><span>🍨</span><p>Tu carrito está vacío.<br>¡Añade un helado relajante!</p></div>`;
  } else {
    body.innerHTML = entries.map(([id, qty]) => {
      const p = getProduct(id);
      if (!p) return '';
      return `
        <div class="cart-item">
          <img src="${assetUrl(p.img)}" alt="${p.name}" loading="lazy">
          <div>
            <h4>${p.name}</h4>
            <div class="price">${fmt(p.price)}</div>
            <div class="qty">
              <button aria-label="Restar" data-act="dec" data-id="${p.id}">−</button>
              <span>${qty}</span>
              <button aria-label="Sumar" data-act="inc" data-id="${p.id}">+</button>
              <button class="remove" data-act="rm" data-id="${p.id}" style="margin-left:10px">Eliminar</button>
            </div>
          </div>
          <strong>${fmt(p.price * qty)}</strong>
        </div>`;
    }).join('');
  }

  const total = $('#cartTotal');
  if (total) total.textContent = fmt(cartTotal());

  // Las opciones de entrega solo tienen sentido si hay productos
  const opts = $('#orderOptions');
  if (opts) opts.hidden = entries.length === 0;
}

/* ---------------- Lugar del pedido: mesa o para llevar ---------------- */
function saveOrder() { saveLS(LS_ORDER, state.order); }

function renderOrderOptions() {
  const wrap = $('#orderOptions');
  if (!wrap) return;

  const esMesa = state.order.mode === 'mesa';

  $$('.order-mode').forEach(b => b.classList.toggle('active', b.dataset.mode === state.order.mode));
  $('#fieldMesa').hidden   = !esMesa;
  $('#fieldLlevar').hidden = esMesa;

  $('#tableNumber').value   = state.order.table   || '';
  $('#deliveryPlace').value = state.order.place   || '';
  $('#deliveryAddress').value = state.order.address || '';
  $('#deliveryName').value  = state.order.name    || '';

  // La dirección solo se pide si es entrega a domicilio
  $('#addressWrap').hidden = state.order.place !== 'Entrega a domicilio';
}

function orderError(msg) {
  const el = $('#orderError');
  if (!el) return;
  el.textContent = msg || '';
  el.classList.toggle('show', Boolean(msg));
}

// Devuelve el texto del destino o null si faltan datos
function orderDestination() {
  if (state.order.mode === 'mesa') {
    if (!state.order.table) { orderError('Elige el número de mesa.'); return null; }
    return state.order.table;
  }
  if (!state.order.place) { orderError('Indica a dónde irá el pedido.'); return null; }
  if (state.order.place === 'Entrega a domicilio' && state.order.address.trim().length < 6) {
    orderError('Escribe una dirección de entrega válida.'); return null;
  }
  if (state.order.name.trim().length < 2) { orderError('Escribe el nombre de quien recoge.'); return null; }
  orderError('');
  return state.order.place === 'Entrega a domicilio'
    ? `${state.order.address.trim()}`
    : 'Recojo en tienda';
}

function nextOrderNumber() {
  const n = loadLS(LS_ORDERNUM, 100) + 1;
  saveLS(LS_ORDERNUM, n);
  return n;
}

function showOrderConfirmed(destino) {
  const panel = $('#orderConfirmed');
  if (!panel) return;

  const esMesa = state.order.mode === 'mesa';
  const staff = pickStaff(state.order.mode);

  $('#ocCode').textContent  = '#' + nextOrderNumber();
  $('#ocType').textContent  = esMesa ? 'Para la mesa 🍽️' : 'Para llevar 🛍️';
  $('#ocPlace').textContent = destino;
  $('#ocStaffLabel').textContent = esMesa ? 'Te atiende' : 'Lleva tu pedido';
  $('#ocStaff').textContent = `${staff.name} (${staff.role})`;

  // Número de contacto de quien entrega el pedido
  const tel = $('#ocPhone');
  tel.textContent = staff.phone;
  tel.href = 'tel:' + staff.phone.replace(/\s/g, '');

  $('#ocItems').textContent = cartCount() + (cartCount() === 1 ? ' producto' : ' productos');
  $('#ocTotal').textContent = fmt(cartTotal());
  $('#ocNote').textContent  = esMesa
    ? `${staff.name} llevará tu pedido a tu mesa en unos minutos. Si necesitas algo, llámale. 💗`
    : (state.order.place === 'Entrega a domicilio'
        ? `${staff.name} saldrá en camino a la dirección indicada. Te avisamos, ${state.order.name.trim()}. 💗`
        : `Podrás recogerlo en el mostrador a nombre de ${state.order.name.trim()}. 💗`);

  panel.hidden = false;
}

/* ---------------- Modo oscuro ---------------- */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  saveLS(LS_THEME, theme);
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#16111b' : '#ffa8c6');
  const btn = $('#themeToggle');
  if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}
function currentTheme() {
  return document.documentElement.getAttribute('data-theme')
      || loadLS(LS_THEME, null)
      || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function toggleTheme() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  toast(next === 'dark' ? 'Modo oscuro activado 🌙' : 'Modo claro activado ☀️');
}

/* ---------------- Favoritos ---------------- */
function toggleFav(id) {
  const i = state.favs.indexOf(id);
  if (i === -1) { state.favs.push(id); toast('Añadido a favoritos 💗'); }
  else { state.favs.splice(i, 1); toast('Quitado de favoritos'); }
  saveLS(LS_FAVS, state.favs);
  $$('.fav-btn[data-id="' + id + '"]').forEach(b => b.classList.toggle('active', state.favs.includes(id)));
}

/* ---------------- Renderizado del catálogo ---------------- */
function productCard(p) {
  const isFav = state.favs.includes(p.id);
  const catLabel = CATEGORIES.find(c => c.id === p.cat)?.label ?? '';
  return `
    <article class="product-card" data-cat="${p.cat}" data-name="${p.name.toLowerCase()}">
      <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${p.id}" aria-label="Marcar favorito" data-act="fav">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
      </button>
      <div class="thumb"><img src="${assetUrl(p.img)}" alt="${p.name}" loading="lazy"></div>
      <div class="body">
        <span class="cat">${catLabel}</span>
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="row">
          <span class="price">${fmt(p.price)}</span>
          <button class="btn btn-primary btn-sm" data-act="add" data-id="${p.id}">Añadir</button>
        </div>
      </div>
    </article>`;
}

function renderProducts(targetSel = '#productGrid', list = PRODUCTS) {
  const grid = $(targetSel);
  if (!grid) return;
  const q = state.query.trim().toLowerCase();
  const filtered = list.filter(p =>
    (state.filter === 'all' || p.cat === state.filter) &&
    (q === '' || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  );
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <strong>Sin resultados</strong>
      <p>No encontramos helados para "${q || state.filter}". Prueba otra búsqueda.</p>
    </div>`;
    return;
  }
  grid.innerHTML = filtered.map(productCard).join('');
}

function renderFilters() {
  const wrap = $('#filters');
  if (!wrap) return;
  wrap.innerHTML = CATEGORIES.map(c =>
    `<button class="chip ${state.filter === c.id ? 'active' : ''}" data-cat="${c.id}">${c.label}</button>`
  ).join('');
}

/* ---------------- Drawer del carrito ---------------- */
function openCart()  { $('#drawer')?.classList.add('open');    $('#drawerOverlay')?.classList.add('open'); }
function closeCart() { $('#drawer')?.classList.remove('open'); $('#drawerOverlay')?.classList.remove('open'); }

/* ---------------- Validación de contacto ---------------- */
function validateContactForm(form) {
  let ok = true;
  const fields = {
    name:    { el: form.name,    test: v => v.trim().length >= 2,    msg: 'Ingresa tu nombre (mínimo 2 caracteres).' },
    email:   { el: form.email,   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: 'Ingresa un correo válido.' },
    subject: { el: form.subject, test: v => v.trim().length >= 3,    msg: 'El asunto es muy corto.' },
    message: { el: form.message, test: v => v.trim().length >= 10,   msg: 'Cuéntanos un poco más (mínimo 10 caracteres).' },
  };
  Object.values(fields).forEach(f => {
    const wrap = f.el.closest('.field');
    const err  = wrap.querySelector('.error');
    if (!f.test(f.el.value)) { wrap.classList.add('invalid'); err.textContent = f.msg; ok = false; }
    else { wrap.classList.remove('invalid'); }
  });
  return ok;
}

/* ---------------- Animaciones de entrada ---------------- */
function setupReveal() {
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
  }, { threshold: .12 });
  $$('.reveal').forEach(el => revealObserver.observe(el));
}

function resolveRoute(pathname) {
  let decodedPath;
  try { decodedPath = decodeURIComponent(pathname); }
  catch { return null; }
  if (!decodedPath.startsWith(appRoot.pathname)) return null;
  const localPath = `/${decodedPath.slice(appRoot.pathname.length)}`.replace(/\/+$/, '') || '/';
  return routes.get(localPath) || null;
}

function setCurrentRoute(route) {
  document.title = route.title;
  $$('.nav-links a').forEach(link => {
    const target = resolveRoute(new URL(link.href).pathname);
    const active = target?.id === route.id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function showRouteState(kind) {
  const content = {
    loading: ['Cargando…', 'Estamos preparando esta sección.'],
    error: ['No pudimos cargar esta sección', 'Comprueba tu conexión e inténtalo de nuevo.'],
    notFound: ['Página no encontrada', 'La dirección que buscas no corresponde a una sección disponible.'],
  }[kind];
  const action = kind === 'error'
    ? '<button class="btn btn-primary" type="button" data-route-retry>Reintentar</button>'
    : kind === 'notFound' ? `<a class="btn btn-primary" href="${new URL('index.html', appRoot).href}">Volver al inicio</a>` : '';
  const main = $('#appView');
  main.dataset.page = kind;
  main.setAttribute('aria-busy', String(kind === 'loading'));
  main.innerHTML = `<section class="section"><div class="container"><h1 class="section-title">${content[0]}</h1><p class="section-sub" role="status">${content[1]}</p>${action}</div></section>`;
}

function initializeView() {
  state.filter = 'all';
  state.query = '';
  renderFilters();
  renderProducts('#productGrid');
  renderProducts('#featuredGrid', PRODUCTS.slice(0, 4));
  renderProducts('#bestGrid', [PRODUCTS[0], PRODUCTS[3], PRODUCTS[8], PRODUCTS[15]]);
  $('#filters')?.addEventListener('click', e => {
    const chip = e.target.closest('.chip'); if (!chip) return;
    state.filter = chip.dataset.cat;
    renderFilters(); renderProducts('#productGrid');
  });
  $('#search')?.addEventListener('input', e => {
    state.query = e.target.value;
    renderProducts('#productGrid');
  });

  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateContactForm(form)) return;
      $('#formSuccess')?.classList.add('show');
      form.reset();
      setTimeout(() => $('#formSuccess')?.classList.remove('show'), 5000);
    });
    $$('#contactForm input, #contactForm textarea').forEach(input => {
      input.addEventListener('input', () => input.closest('.field')?.classList.remove('invalid'));
    });
  }

  $('#appView').removeAttribute('aria-busy');
  updateCartUI();
  setupReveal();
}

async function renderRoute(pathname, { initial = false } = {}) {
  pendingRoute?.abort();
  pendingRoute = undefined;
  const route = resolveRoute(pathname);
  if (!route) {
    document.title = 'Página no encontrada — Heladería Slowpoke';
    $$('.nav-links a').forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });
    showRouteState('notFound');
    return;
  }

  setCurrentRoute(route);
  const main = $('#appView');
  if (initial && main.dataset.page === route.id) {
    initializeView();
    return;
  }

  const controller = new AbortController();
  pendingRoute = controller;
  showRouteState('loading');
  try {
    const response = await fetch(new URL(route.file, appRoot), { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const page = new DOMParser().parseFromString(await response.text(), 'text/html');
    const nextMain = page.querySelector('main[data-page]');
    if (!nextMain || nextMain.dataset.page !== route.id) throw new Error('Vista no disponible');
    if (pendingRoute !== controller) return;
    nextMain.querySelectorAll('img[src], source[src]').forEach(image => {
      image.src = new URL(image.getAttribute('src'), appRoot).href;
    });
    $('#appView').replaceWith(document.importNode(nextMain, true));
    setCurrentRoute(route);
    initializeView();
  } catch (error) {
    if (error.name === 'AbortError') return;
    if (pendingRoute === controller) showRouteState('error');
  }
}

function handleNavigation(event) {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.hasAttribute('download') || (link.target && link.target !== '_self') || link.relList.contains('external')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || !url.pathname.startsWith(appRoot.pathname)) return;
  if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
  if (url.pathname === location.pathname && url.search === location.search) return;
  if (/\.[^/]+$/.test(url.pathname) && !/\.html?$/i.test(url.pathname)) return;

  event.preventDefault();
  $('#navLinks')?.classList.remove('open');
  history.pushState({}, '', url);
  renderRoute(url.pathname);
  window.scrollTo(0, 0);
}

/* ---------------- Inicialización global ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Tema (claro / oscuro)
  applyTheme(currentTheme());
  $('#themeToggle')?.addEventListener('click', toggleTheme);

  // Año en footer
  $$('.year').forEach(e => e.textContent = new Date().getFullYear());

  // Menú móvil
  $('#menuToggle')?.addEventListener('click', () => $('#navLinks')?.classList.toggle('open'));

  // Carrito
  $('#openCart')?.addEventListener('click', openCart);
  $('#closeCart')?.addEventListener('click', closeCart);
  $('#drawerOverlay')?.addEventListener('click', closeCart);
  $('#cartBody')?.addEventListener('click', e => {
    const btn = e.target.closest('button[data-act]');
    if (!btn) return;
    const { act, id } = btn.dataset;
    if (act === 'inc') changeQty(id, +1);
    if (act === 'dec') changeQty(id, -1);
    if (act === 'rm')  removeFromCart(id);
  });
  // Mesa o para llevar
  $('#orderModes')?.addEventListener('click', e => {
    const btn = e.target.closest('.order-mode'); if (!btn) return;
    state.order.mode = btn.dataset.mode;
    saveOrder(); orderError(''); renderOrderOptions();
  });
  $('#tableNumber')?.addEventListener('change', e => {
    state.order.table = e.target.value; saveOrder(); orderError('');
  });
  $('#deliveryPlace')?.addEventListener('change', e => {
    state.order.place = e.target.value; saveOrder(); orderError(''); renderOrderOptions();
  });
  $('#deliveryAddress')?.addEventListener('input', e => {
    state.order.address = e.target.value; saveOrder(); orderError('');
  });
  $('#deliveryName')?.addEventListener('input', e => {
    state.order.name = e.target.value; saveOrder(); orderError('');
  });

  $('#checkoutBtn')?.addEventListener('click', () => {
    if (cartCount() === 0) return toast('Tu carrito está vacío 🥲');
    const destino = orderDestination();
    if (!destino) return toast('Completa los datos del pedido 📍');
    showOrderConfirmed(destino);
    toast('¡Compra confirmada! ✨');
    state.cart = {}; saveLS(LS_CART, state.cart); updateCartUI();
  });

  $('#ocClose')?.addEventListener('click', () => {
    $('#orderConfirmed').hidden = true;
    closeCart();
  });

  renderOrderOptions();

  // Delegación: añadir y favoritos en cualquier grid
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('button[data-act]');
    if (!btn || !btn.dataset.id) return;
    if (btn.dataset.act === 'add') addToCart(btn.dataset.id);
    if (btn.dataset.act === 'fav') toggleFav(btn.dataset.id);
  });

  updateCartUI();
  document.addEventListener('click', handleNavigation);
  document.addEventListener('click', event => {
    if (event.target.closest('[data-route-retry]')) renderRoute(location.pathname);
  });
  window.addEventListener('popstate', () => renderRoute(location.pathname));
  try {
    const redirectedPath = sessionStorage.getItem('slowpoke_spa_path');
    if (redirectedPath) {
      sessionStorage.removeItem('slowpoke_spa_path');
      history.replaceState({}, '', redirectedPath);
    }
  } catch {}
  const route = resolveRoute(location.pathname);
  if (route) setCurrentRoute(route);
  renderRoute(location.pathname, { initial: true });
});