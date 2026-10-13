import { useShop } from '../state/ShopContext.js'

export default function OrderOptions({ error, clearError }) {
  const { order, setOrder } = useShop()
  const update = (key, value) => { setOrder(current => ({ ...current, [key]: value })); clearError() }
  return <div className="order-options" id="orderOptions">
    <h4>¿Cómo quieres tu pedido?</h4>
    <div className="order-modes" id="orderModes">{[['mesa', '🍽️ Para la mesa'], ['llevar', '🛍️ Para llevar']].map(([mode, label]) =>
      <button key={mode} type="button" className={`order-mode ${order.mode === mode ? 'active' : ''}`} aria-pressed={order.mode === mode} onClick={() => update('mode', mode)}>{label}</button>)}</div>
    <div className="order-field" id="fieldMesa" hidden={order.mode !== 'mesa'}>
      <label htmlFor="tableNumber">Número de mesa</label>
      <select id="tableNumber" value={order.table} onChange={e => update('table', e.target.value)}>
        <option value="">Selecciona tu mesa…</option>
        {[...Array.from({ length: 8 }, (_, i) => `Mesa ${i + 1}`), 'Barra', 'Terraza'].map(table => <option key={table}>{table}</option>)}
      </select>
    </div>
    <div className="order-field" id="fieldLlevar" hidden={order.mode !== 'llevar'}>
      <label htmlFor="deliveryPlace">¿A dónde irá el pedido?</label>
      <select id="deliveryPlace" value={order.place} onChange={e => update('place', e.target.value)}>
        <option value="">Elige una opción…</option><option>Recojo en tienda</option><option>Entrega a domicilio</option>
      </select>
      <div id="addressWrap" hidden={order.place !== 'Entrega a domicilio'}>
        <label htmlFor="deliveryAddress" style={{ marginTop: 10 }}>Dirección de entrega</label>
        <input id="deliveryAddress" type="text" placeholder="Calle y número, zona / referencia" value={order.address} onChange={e => update('address', e.target.value)} />
      </div>
      <label htmlFor="deliveryName" style={{ marginTop: 10 }}>Nombre de quien recoge</label>
      <input id="deliveryName" type="text" placeholder="Tu nombre" value={order.name} onChange={e => update('name', e.target.value)} />
    </div>
    <p className={`order-error ${error ? 'show' : ''}`} id="orderError" role="alert">{error}</p>
  </div>
}