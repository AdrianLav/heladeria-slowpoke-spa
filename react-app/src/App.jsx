import Header from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ShopProvider from './state/ShopProvider.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Promotions from './pages/Promotions.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
const pages = { 'index.html': Home, 'menu.html': Menu, 'promociones.html': Promotions, 'nosotros.html': About, 'contacto.html': Contact }
export default function App() {
  const page = window.location.pathname.split('/').pop() || 'index.html'
  const Page = pages[page] || Home
  return <ShopProvider><Header page={page} /><main><Page /></main><Footer home={Page === Home} /><CartDrawer /></ShopProvider>
}
