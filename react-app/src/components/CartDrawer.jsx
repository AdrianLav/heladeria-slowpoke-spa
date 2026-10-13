import { useEffect, useRef, useState } from 'react'
import { PRODUCTS, STAFF } from '../data/catalog.js'
import { formatPrice, readStorage, updateQuantity, validateOrder, writeStorage } from '../lib/shop.js'
import { useShop } from '../state/ShopContext.js'
import OrderConfirmation from './OrderConfirmation.jsx'
import OrderOptions from './OrderOptions.jsx'
export default function CartDrawer() {
  const { cart, setCart, count, total, order, cartOpen, setCartOpen, toast } = useShop()
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState(null)
  const closeButton = useRef(null)
  useEffect(() => {
    if (!cartOpen) return
    const previous = document.activeElement
    closeButton.current?.focus()
    return () => previous?.focus()
  }, [cartOpen])
  function checkout() {
    if (!count) return toast('Tu carrito está vacío 🥲')
    const message = validateOrder(order)
    setError(message)
    if (message) return toast('Completa los datos del pedido 📍')
    const previous = readStorage('slowpoke_order_num', 100)
    const code = (Number.isSafeInteger(previous) ? previous : 100) + 1
    writeStorage('slowpoke_order_num', code)
    const staff = STAFF[order.mode][Math.floor(Math.random() * STAFF[order.mode].length)]
    setReceipt({ order: { ...order }, staff, code, count, total })
    setCart({}); toast('¡Compra confirmada! ✨')
  }
  return <>
    <div className={`drawer-overlay ${cartOpen ? 'open' : ''}`} id="drawerOverlay" onClick={() => setCartOpen(false)} />
    <aside className={`drawer ${cartOpen ? 'open' : ''}`} id="drawer" aria-label="Carrito de compra" inert={!cartOpen} onKeyDown={e => { if (e.key === 'Escape') setCartOpen(false) }}>
      <div className="drawer-head"><h3>Tu carrito</h3><button ref={closeButton} className="icon-btn" id="closeCart" aria-label="Cerrar carrito" onClick={() => setCartOpen(false)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button></div>
      <div className="drawer-body" id="cartBody">{count ? Object.entries(cart).map(([id, qty]) => {
        const product = PRODUCTS.find(p => p.id === id)
        return <div className="cart-item" key={id}><img src={product.img} alt={product.name} loading="lazy" /><div><h4>{product.name}</h4><div className="price">{formatPrice(product.price)}</div>
          <div className="qty"><button aria-label="Restar" onClick={() => setCart(current => updateQuantity(current, id, -1))}>−</button><span>{qty}</span><button aria-label="Sumar" onClick={() => setCart(current => updateQuantity(current, id, 1))}>+</button><button className="remove" style={{ marginLeft: 10 }} onClick={() => setCart(current => { const next = { ...current }; delete next[id]; return next })}>Eliminar</button></div></div><strong>{formatPrice(product.price * qty)}</strong></div>
      }) : <div className="cart-empty"><span>🍨</span><p>Tu carrito está vacío.<br />¡Añade un helado relajante!</p></div>}</div>
      {!!count && <OrderOptions error={error} clearError={() => setError('')} />}
      <div className="drawer-foot"><div className="total"><span>Total</span><strong id="cartTotal">{formatPrice(total)}</strong></div><button className="btn btn-primary" id="checkoutBtn" style={{ width: '100%' }} onClick={checkout}>Finalizar pedido</button></div>
      {receipt && <OrderConfirmation receipt={receipt} onClose={() => { setReceipt(null); setCartOpen(false) }} />}
    </aside>
  </>
}
