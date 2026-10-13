import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartSummary, destination, emptyOrder, filterProducts, formatPrice, normalizeCart, normalizeOrder, updateQuantity, validateContact, validateOrder } from '../src/lib/shop.js'

test('cart adds, increments and removes without mutating previous state', () => {
  const original = { p1: 1 }
  const updated = updateQuantity(original, 'p1', 1)
  assert.deepEqual(original, { p1: 1 })
  assert.deepEqual(updated, { p1: 2 })
  assert.deepEqual(updateQuantity(updated, 'p1', -2), {})
  assert.deepEqual(updateQuantity({}, 'missing', 1), {})
})
test('totals use original prices and sum units, not product rows', () => {
  assert.deepEqual(cartSummary({ p1: 2, p4: 1 }), { count: 3, total: 86 })
  assert.equal(formatPrice(86), 'Bs. 86.00')
  assert.deepEqual(cartSummary({}), { count: 0, total: 0 })
})
test('invalid saved cart and order data do not break the application', () => {
  assert.deepEqual(normalizeCart({ p1: 2, p2: -1, p3: '2', p4: 1.5, ghost: 4 }), { p1: 2 })
  assert.deepEqual(normalizeCart(null), {})
  assert.deepEqual(normalizeOrder({ mode: 'wrong', table: null }), emptyOrder)
})
test('catalog has all sixteen products; search matches descriptions and case', () => {
  assert.equal(filterProducts('', 'all').length, 16)
  assert.equal(filterProducts('  MADAGASCAR ', 'all')[0].id, 'p2')
  assert.equal(filterProducts('', 'clasicos').length, 4)
  assert.equal(filterProducts('fresa', 'premium').length, 0)
  assert.equal(filterProducts('zz-no-result', 'all').length, 0)
})
test('table checkout requires a destination', () => {
  assert.equal(validateOrder(emptyOrder), 'Elige el número de mesa.')
  const order = { ...emptyOrder, table: 'Mesa 8' }
  assert.equal(validateOrder(order), '')
  assert.equal(destination(order), 'Mesa 8')
})
test('pickup requires a place and a two-character name, but no address', () => {
  const order = { ...emptyOrder, mode: 'llevar' }
  assert.equal(validateOrder(order), 'Indica a dónde irá el pedido.')
  order.place = 'Recojo en tienda'
  order.name = ' A '
  assert.equal(validateOrder(order), 'Escribe el nombre de quien recoge.')
  order.name = 'Ana'
  assert.equal(validateOrder(order), '')
  assert.equal(destination(order), 'Recojo en tienda')
})
test('delivery checks address length before pickup name', () => {
  const order = { ...emptyOrder, mode: 'llevar', place: 'Entrega a domicilio', address: ' 12345 ' }
  assert.equal(validateOrder(order), 'Escribe una dirección de entrega válida.')
  order.address = ' Calle 123 '
  assert.equal(validateOrder(order), 'Escribe el nombre de quien recoge.')
  order.name = 'Ana'
  assert.equal(validateOrder(order), '')
  assert.equal(destination(order), 'Calle 123')
})
test('contact reports all invalid fields and respects legacy length boundaries', () => {
  assert.equal(Object.keys(validateContact({ name: '', email: 'a@b.c', subject: 'ab', message: '123456789' })).length, 4)
  assert.deepEqual(validateContact({ name: ' Ab ', email: ' a@b.co ', subject: 'abc', message: '1234567890' }), {})
})
