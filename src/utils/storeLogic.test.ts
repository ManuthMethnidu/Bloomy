import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCTS,
  formatLkr,
  computeCardCylinderGeometry,
  buildRoundedQuadPath,
  computeTileGridTransform,
  filterProductsByCategory,
  calculateCartTotals,
  validateCustomerForm,
  buildWhatsAppOrderPayload,
} from './storeLogic';

test('formatLkr formats Sri Lankan Rupee amounts clearly', () => {
  assert.equal(formatLkr(6850), 'LKR 6,850');
  assert.equal(formatLkr(14500), 'LKR 14,500');
  assert.equal(formatLkr(0), 'LKR 0');
});

test('computeCardCylinderGeometry produces exact centre card and taller edge cards', () => {
  const centerCard = computeCardCylinderGeometry(0);
  assert.equal(centerCard.centerX, 720);
  assert.equal(centerCard.centerY, 687);
  assert.equal(centerCard.width, 216);
  assert.equal(
    Math.abs(centerCard.leftHeight - centerCard.rightHeight) < 0.001,
    true
  );
  assert.equal(centerCard.leftHeight >= 280 && centerCard.leftHeight < 282, true);

  // Right edge card (e.g. t = +588u, 3 pitches to the right)
  const rightEdgeCard = computeCardCylinderGeometry(588);
  assert.equal(rightEdgeCard.centerX > 720 + 588, true);
  assert.equal(rightEdgeCard.width > 240, true);
  // Outer edge (rightHeight) must be taller than inner edge (leftHeight)
  assert.equal(rightEdgeCard.rightHeight > rightEdgeCard.leftHeight, true);
  assert.equal(rightEdgeCard.centerY < 687, true);
});

test('buildRoundedQuadPath creates a valid closed SVG path with M, Q, L, Z commands', () => {
  const path = buildRoundedQuadPath(170, 280, 310, 15);
  assert.equal(path.startsWith('M '), true);
  assert.equal(path.endsWith('Z'), true);
  assert.equal(path.includes('Q '), true);
});

test('computeTileGridTransform sizes 5x2 grid to cover-fit card dimensions', () => {
  const tile = computeTileGridTransform(170, 280, 4);
  assert.equal(tile.gridWidth >= 170 * 5, true);
  assert.equal(tile.gridHeight >= 280 * 2, true);
  assert.equal(tile.offsetX < 0, true);
});

test('filterProductsByCategory returns all or matching category items', () => {
  assert.equal(PRODUCTS.length >= 10, true);
  const all = filterProductsByCategory(PRODUCTS, 'All');
  assert.equal(all.length, PRODUCTS.length);

  const trees = filterProductsByCategory(PRODUCTS, 'Trees');
  assert.equal(trees.length > 0, true);
  assert.equal(trees.every((p) => p.category === 'Trees'), true);
});

test('calculateCartTotals computes subtotal, delivery fee, and pickup discount accurately', () => {
  const items = [
    { product: PRODUCTS[0], quantity: 2 }, // 2 * 14500 = 29000
    { product: PRODUCTS[3], quantity: 1 }, // 1 * 5850 = 5850
  ];
  const colomboDelivery = calculateCartTotals(items, 'delivery', 'colombo');
  assert.equal(colomboDelivery.itemCount, 3);
  assert.equal(colomboDelivery.subtotalLkr, 34850);
  assert.equal(colomboDelivery.deliveryFeeLkr, 450);
  assert.equal(colomboDelivery.totalLkr, 35300);

  const pickupTotals = calculateCartTotals(items, 'pickup', 'colombo');
  assert.equal(pickupTotals.deliveryFeeLkr, 0);
  assert.equal(pickupTotals.totalLkr, 34850);
});

test('validateCustomerForm requires address only for delivery and checks phone/name', () => {
  const invalidDelivery = validateCustomerForm({
    name: '',
    phone: '123',
    address: '',
    deliveryMethod: 'delivery',
    deliveryZone: 'colombo',
    notes: '',
  });
  assert.equal(Boolean(invalidDelivery.name), true);
  assert.equal(Boolean(invalidDelivery.phone), true);
  assert.equal(Boolean(invalidDelivery.address), true);

  const validPickup = validateCustomerForm({
    name: 'Nimal Perera',
    phone: '077 456 7890',
    address: '',
    deliveryMethod: 'pickup',
    deliveryZone: 'colombo',
    notes: 'Please wrap as a gift',
  });
  assert.equal(Object.keys(validPickup).length, 0);
});

test('buildWhatsAppOrderPayload produces a pre-filled wa.me link with order details', () => {
  const items = [{ product: PRODUCTS[0], quantity: 1 }];
  const payload = buildWhatsAppOrderPayload(
    items,
    {
      name: 'Kavindi Silva',
      phone: '0771234567',
      address: '15 Ward Place, Colombo 07',
      deliveryMethod: 'delivery',
      deliveryZone: 'colombo',
      notes: 'Leave at reception',
    },
    'BLM-8042'
  );
  assert.equal(payload.url.startsWith('https://wa.me/94770000000?text='), true);
  assert.equal(payload.message.includes('BLM-8042'), true);
  assert.equal(payload.message.includes('Kavindi Silva'), true);
  assert.equal(payload.message.includes('Tropical Monstera Deliciosa'), true);
  assert.equal(payload.message.includes('LKR 14,950'), true);
});
