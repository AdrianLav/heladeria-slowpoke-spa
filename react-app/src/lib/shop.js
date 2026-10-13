import { PRODUCTS } from '../data/catalog.js'

export const formatPrice = amount => `Bs. ${amount.toFixed(2)}`
export const emptyOrder = { mode: 'mesa', table: '', place: '', address: '', name: '' }
export function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
export function writeStorage(key, value) {
  // The app remains usable when the browser disables storage.
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* memory state remains available */ }
}
export function normalizeCart(cart) {
  return Object.fromEntries(Object.entries(cart && typeof cart === 'object' ? cart : {})
    .filter(([id, qty]) => PRODUCTS.some(p => p.id === id) && Number.isSafeInteger(qty) && qty > 0))
}
export function normalizeOrder(order) {
  const value = { ...emptyOrder }
  for (const key of Object.keys(value)) if (typeof order?.[key] === 'string') value[key] = order[key]
  if (!['mesa', 'llevar'].includes(value.mode)) value.mode = 'mesa'
  return value
}
export function updateQuantity(cart, id, delta) {
  const next = { ...cart, [id]: (cart[id] || 0) + delta }
  if (next[id] <= 0) delete next[id]
  return normalizeCart(next)
}
export function cartSummary(cart) {
  return Object.entries(normalizeCart(cart)).reduce((sum, [id, qty]) => ({
    count: sum.count + qty,
    total: sum.total + PRODUCTS.find(p => p.id === id).price * qty,
  }), { count: 0, total: 0 })
}
export function filterProducts(query, category, products = PRODUCTS) {
  const q = query.trim().toLowerCase()
  return products.filter(p => (category === 'all' || p.cat === category) &&
    (!q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)))
}
export function validateOrder(order) {
  if (order.mode === 'mesa') return order.table ? '' : 'Elige el número de mesa.'
  if (!order.place) return 'Indica a dónde irá el pedido.'
  if (order.place === 'Entrega a domicilio' && order.address.trim().length < 6) return 'Escribe una dirección de entrega válida.'
  if (order.name.trim().length < 2) return 'Escribe el nombre de quien recoge.'
  return ''
}
export function destination(order) {
  return order.mode === 'mesa' ? order.table : order.place === 'Entrega a domicilio' ? order.address.trim() : 'Recojo en tienda'
}
export function validateContact(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Ingresa tu nombre (mínimo 2 caracteres).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Ingresa un correo válido.'
  if (values.subject.trim().length < 3) errors.subject = 'El asunto es muy corto.'
  if (values.message.trim().length < 10) errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  return errors
}
