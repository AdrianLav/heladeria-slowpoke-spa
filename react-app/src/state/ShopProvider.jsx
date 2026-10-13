import { useEffect, useRef, useState } from 'react'
import { ShopContext } from './ShopContext.js'
import { PRODUCTS } from '../data/catalog.js'
import { cartSummary, emptyOrder, normalizeCart, normalizeOrder, readStorage, updateQuantity, writeStorage } from '../lib/shop.js'

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => normalizeCart(readStorage('slowpoke_cart', {})))
  const [favs, setFavs] = useState(() => {
    const saved = readStorage('slowpoke_favs', [])
    return Array.isArray(saved) ? saved.filter(id => PRODUCTS.some(p => p.id === id)) : []
  })
  const [order, setOrder] = useState(() => normalizeOrder(readStorage('slowpoke_order', emptyOrder)))
  const [theme, setTheme] = useState(() => {
    const saved = readStorage('slowpoke_theme', null)
    return ['light', 'dark'].includes(saved) ? saved : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [message, setMessage] = useState('')
  const toastTimer = useRef()
  useEffect(() => writeStorage('slowpoke_cart', cart), [cart])
  useEffect(() => writeStorage('slowpoke_favs', favs), [favs])
  useEffect(() => writeStorage('slowpoke_order', order), [order])
  useEffect(() => {
    // Document-level theme must also cover the body and browser chrome.
    document.documentElement.dataset.theme = theme
    writeStorage('slowpoke_theme', theme)
  }, [theme])
  useEffect(() => () => clearTimeout(toastTimer.current), [])
  function toast(text) {
    clearTimeout(toastTimer.current)
    setMessage(text)
    toastTimer.current = setTimeout(() => setMessage(''), 1800)
  }
  function addToCart(id) { setCart(current => updateQuantity(current, id, 1)); toast('Añadido al carrito 🍦') }
  function toggleFav(id) {
    const isFavorite = favs.includes(id)
    setFavs(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
    toast(isFavorite ? 'Quitado de favoritos' : 'Añadido a favoritos 💗')
  }
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    toast(next === 'dark' ? 'Modo oscuro activado 🌙' : 'Modo claro activado ☀️')
  }
  const summary = cartSummary(cart)
  return <ShopContext.Provider value={{ cart, setCart, favs, order, setOrder, theme, toggleTheme, cartOpen, setCartOpen, toast, addToCart, toggleFav, ...summary }}>
    <meta name="theme-color" content={theme === 'dark' ? '#16111b' : '#ffa8c6'} />
    {children}
    <div className={`toast ${message ? 'show' : ''}`} role="status">{message}</div>
  </ShopContext.Provider>
}
