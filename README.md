# 🍦 Heladería Slowpoke

> Los helados más relajados y deliciosos de la ciudad.

Aplicación responsive para una heladería artesanal, construida con **HTML5, CSS3 y JavaScript Vanilla**. La navegación entre vistas usa History API y conserva el carrito y los componentes compartidos sin recargar el documento.

---

## ✨ Descripción del proyecto

Heladería Slowpoke es una heladería moderna y juguetona inspirada en la personalidad calmada, amable y relajada de una mascota rosada original. El sitio crea una experiencia divertida, acogedora y memorable para clientes que quieren explorar sabores, promociones especiales y realizar pedidos.

> ⚠️ Identidad de marca **100 % original**. No se utilizan imágenes, nombres ni assets oficiales de Pokémon. La inspiración proviene únicamente de las emociones y la personalidad asociadas a la calma y la ternura.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** semántico y accesible
- **CSS3** moderno (variables, grid, flexbox, animaciones)
- **JavaScript (Vanilla JS)** — sin frameworks
- **History API** para navegación SPA; admite rutas `.html` existentes y rutas limpias
- **LocalStorage** para persistencia de carrito y favoritos
- **Google Fonts** (Fraunces + Nunito)
- **Diseño responsive** mobile-first

---

## 🎯 Funcionalidades

### 🛒 Carrito de compras
- Añadir, eliminar y modificar cantidades
- Cálculo automático del total
- Contador de productos en la barra superior
- Persistencia con LocalStorage
- Drawer lateral animado

### 🔎 Búsqueda de productos
- Barra de búsqueda en tiempo real
- Filtrado instantáneo por nombre y descripción

### 🏷️ Filtros por categoría
- Clásicos · Frutales · Especiales Slowpoke · Premium · Ediciones Temporales
- Filtrado dinámico sin recargar la página

### 💗 Sistema de favoritos
- Marcar / desmarcar sabores favoritos
- Persistencia con LocalStorage

### ✉️ Formulario de contacto
- Validación en JavaScript (nombre, email, asunto, mensaje)
- Mensajes de error amigables
- Confirmación visual en cliente; no hay un servicio/backend de envío configurado

### 🧭 Navegación SPA
- Navegación interna sin recarga, con soporte para Atrás y Adelante
- Acceso directo a las vistas y fallback para rutas inexistentes
- Enlaces externos, `tel:`, descargas y navegación en nueva pestaña conservan el comportamiento del navegador

### 🎨 Diseño y UX
- Paleta rosa suave, crema, blanco, azul claro y púrpura pastel
- Tipografías modernas (Fraunces + Nunito)
- Animaciones de scroll, hover y entrada
- Totalmente responsive (móvil, tablet, escritorio)
- Foco accesible y semántica correcta

---

## 📂 Estructura del proyecto

```
heladeria-slowpoke/
├── index.html           # Página principal
├── heladeria adruko.html # Alias de la página principal
├── menu.html            # Catálogo completo
├── promociones.html     # Ofertas y combos
├── nosotros.html        # Historia y valores
├── contacto.html        # Formulario + ubicación
├── css/
│   └── styles.css       # Sistema de diseño completo
├── js/
│   └── script.js        # Carrito, búsqueda, favoritos, validación
├── assets/
│   ├── images/          # Productos, mascota, logo
│   └── icons/
├── 404.html             # Fallback de rutas para GitHub Pages
├── _redirects           # Fallback de rutas para Netlify
├── react-app/           # Prototipo React/Vite separado; no es el sitio desplegado desde la raíz
└── README.md
```

---

## 🚀 Instalación local

La aplicación no requiere build ni dependencias de runtime. Para probar rutas limpias y el fallback 404 se necesita un servidor estático con modo SPA.

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/heladeria-slowpoke.git
cd heladeria-slowpoke

# 2. Sirve la raíz con fallback SPA
npx serve -s .
```

Abre la URL que indique `serve`. Las páginas `.html` existentes también funcionan directamente; el modo SPA de `serve` permite probar además las rutas limpias y la vista 404.

---

## 📤 Despliegue en GitHub

```bash
git init
git add .
git commit -m "feat: lanzamiento Heladería Slowpoke"
git branch -M main
git remote add origin https://github.com/tu-usuario/heladeria-slowpoke.git
git push -u origin main
```

Para activar **GitHub Pages**, publica la raíz del repositorio:
1. Ve a *Settings → Pages*
2. Source: `Deploy from a branch` → `main` / `/ (root)`
3. Guarda y espera el enlace público. `404.html` conserva la ruta solicitada y permite abrir o recargar rutas internas; no requiere cambios de servidor.

---

## 🌐 Despliegue en Netlify

### Opción 1 · Drag & drop (la más rápida)
1. Entra a [netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta raíz del proyecto
3. ¡Listo! Obtendrás una URL pública.

### Opción 2 · Conectado a GitHub
1. Netlify → *Add new site → Import from Git*
2. Selecciona el repositorio
3. **Build command:** *(vacío)*  
   **Publish directory:** `.`. El archivo `_redirects` aplica el fallback SPA sin cambiar las rutas de recursos existentes.
4. Deploy

---

## 👤 Autor

**Proyecto académico** · Heladería Slowpoke  
Identidad de marca, ilustraciones y código originales creados específicamente para esta entrega.

---

## 🤖 Desarrollo asistido por IA

Este proyecto fue desarrollado con apoyo de herramientas de inteligencia artificial para:
- Generación de ilustraciones originales de productos y mascota
- Asistencia en estructura HTML/CSS y arquitectura JS
- Redacción de copys y descripciones

Todo el contenido fue revisado, ajustado y validado manualmente para asegurar calidad, originalidad y cumplimiento de los requisitos del proyecto.

---

🍓 *Hecho con calma y mucho cariño.*
