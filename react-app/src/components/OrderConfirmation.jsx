import { destination, formatPrice } from '../lib/shop.js'

export default function OrderConfirmation({ receipt, onClose }) {
  const { order, staff, code, count, total } = receipt
  const table = order.mode === 'mesa'
  const note = table ? `${staff.name} llevará tu pedido a tu mesa en unos minutos. Si necesitas algo, llámale. 💗`
    : order.place === 'Entrega a domicilio' ? `${staff.name} saldrá en camino a la dirección indicada. Te avisamos, ${order.name.trim()}. 💗`
      : `Podrás recogerlo en el mostrador a nombre de ${order.name.trim()}. 💗`
  return <div className="order-confirmed" id="orderConfirmed" role="status">
    <div className="oc-check">✓</div><h3>¡Compra confirmada!</h3><p className="oc-code">Pedido <strong id="ocCode">#{code}</strong></p>
    <div className="oc-rows">
      <div><span>Tipo de pedido</span><strong>{table ? 'Para la mesa 🍽️' : 'Para llevar 🛍️'}</strong></div>
      <div><span>Irá a</span><strong>{destination(order)}</strong></div>
      <div><span>{table ? 'Te atiende' : 'Lleva tu pedido'}</span><strong>{staff.name} ({staff.role})</strong></div>
      <div><span>Contacto</span><strong><a href={`tel:${staff.phone.replace(/\s/g, '')}`}>{staff.phone}</a></strong></div>
      <div><span>Productos</span><strong>{count} {count === 1 ? 'producto' : 'productos'}</strong></div>
      <div><span>Total</span><strong>{formatPrice(total)}</strong></div>
    </div>
    <p className="oc-note">{note}</p><button className="btn btn-primary" id="ocClose" style={{ width: '100%' }} onClick={onClose}>Listo</button>
  </div>
}