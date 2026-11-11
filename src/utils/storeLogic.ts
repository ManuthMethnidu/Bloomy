export type Language = 'EN' | 'SI' | 'TA';

export type CategoryId =
  | 'All'
  | 'Indoor Plants'
  | 'Hanging Plants'
  | 'Flowers'
  | 'Trees'
  | 'Pots & Accessories';

export type DeliveryMethod = 'delivery' | 'pickup';
export type DeliveryZone = 'colombo' | 'outstation';

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryId, 'All'>;
  tag: string;
  priceLkr: number;
  shortDesc: string;
  heightSpec: string;
  materialSpec: string;
  placementSpec: string;
  potIncluded: string;
  tileIndex: number;
  botanicalStyle:
    | 'monstera'
    | 'fiddle'
    | 'olive'
    | 'strelitzia'
    | 'eucalyptus'
    | 'fern'
    | 'orchid'
    | 'peacelily'
    | 'areca'
    | 'planter'
    | 'pothos'
    | 'bamboo';
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerForm {
  name: string;
  phone: string;
  address: string;
  deliveryMethod: DeliveryMethod;
  deliveryZone: DeliveryZone;
  notes: string;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export const WHATSAPP_NUMBER = '94770000000';

export const DELIVERY_RATES: Record<DeliveryZone, { fee: number; label: string; timeline: string }> = {
  colombo: {
    fee: 450,
    label: 'Colombo & Suburbs (1–2 Working Days)',
    timeline: '1–2 working days',
  },
  outstation: {
    fee: 850,
    label: 'Outstation Island-Wide (2–4 Working Days)',
    timeline: '2–4 working days',
  },
};

export const BANK_DETAILS = {
  bankName: 'Commercial Bank of Ceylon PLC',
  accountName: 'Bloomy (Pvt) Ltd',
  accountNumber: '1000 8492 7301',
  branch: 'Colombo 07 (Cinnamon Gardens)',
  swiftCode: 'CCEYLKLX',
};

export const PICKUP_LOCATION = {
  title: 'Bloomy Studio Showroom — Colombo 05',
  address: 'No. 42, Fife Road, Havelock Town, Colombo 05',
  hours: 'Daily 9:30 AM – 7:00 PM (Ready within 2 hours of order confirmation)',
};

export const HERO_CAROUSEL_CARDS = [
  {
    id: 'plant-vid-0',
    videoUrl: 'https://assets.mixkit.co/videos/50860/50860-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/50860/50860-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-1',
    videoUrl: 'https://assets.mixkit.co/videos/1892/1892-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/1892/1892-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-2',
    videoUrl: 'https://assets.mixkit.co/videos/14896/14896-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/14896/14896-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-3',
    videoUrl: 'https://assets.mixkit.co/videos/43696/43696-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/43696/43696-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-4',
    videoUrl: 'https://assets.mixkit.co/videos/1888/1888-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/1888/1888-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-5',
    videoUrl: 'https://assets.mixkit.co/videos/43706/43706-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/43706/43706-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-6',
    videoUrl: 'https://assets.mixkit.co/videos/94/94-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/94/94-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-7',
    videoUrl: 'https://assets.mixkit.co/videos/43708/43708-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/43708/43708-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-8',
    videoUrl: 'https://assets.mixkit.co/videos/1895/1895-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/1895/1895-thumb-360-0.jpg',
  },
  {
    id: 'plant-vid-9',
    videoUrl: 'https://assets.mixkit.co/videos/43709/43709-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/43709/43709-thumb-360-0.jpg',
  },
];

export const UI_STRINGS = {
  navShopPlants: 'Shop Plants',
  navTreesFlowers: 'Trees & Flowers',
  navPots: 'Pots',
  navCommercial: 'Commercial & Hotels',
  navDelivery: 'Delivery',
  cartLabel: 'Cart',
  shopNow: 'Shop Now',
  heroBadge: '🌿 Island-Wide Delivery Across Sri Lanka',
  heroHeadline1: 'Fresh Greenery,',
  heroHeadline2: 'Zero Maintenance',
  heroSub1: 'Bring the look of fresh greenery to homes, offices, hotels, and gifts',
  heroSub2: 'with no watering, no mess, and no fading. Browse our collection,',
  heroSub3: 'order in a few taps, and we deliver island-wide.',
  noteTopRight1: 'No watering,',
  noteTopRight2: 'no fading',
  noteBottom: 'Order in a few taps',
  browseCollection: 'Browse Collection',
  catalogHeading: 'Curated Botanical Collection',
  catalogSub:
    'Lifelike PEVA and real-touch silk plants crafted for Sri Lankan homes, offices, and hospitality spaces.',
};

export const PRODUCTS: Product[] = [
  {
    id: 'monstera-deliciosa-120',
    name: 'Tropical Monstera Deliciosa',
    category: 'Indoor Plants',
    tag: 'Best for Offices',
    priceLkr: 14500,
    shortDesc: 'Iconic split-leaf tropical statement plant with realistic aerial roots and natural sheen.',
    heightSpec: '120cm height · 22cm weighted pot diameter',
    materialSpec: 'Real-touch PEVA fenestrated foliage, bendable steel-core stems, weighted matte black nursery pot',
    placementSpec: 'Living room corners, executive office suites, shaded verandas, studio apartments',
    potIncluded: 'Weighted matte charcoal nursery pot with natural dried moss topping',
    tileIndex: 4,
    botanicalStyle: 'monstera',
    inStock: true,
  },
  {
    id: 'fiddle-leaf-fig-160',
    name: 'Royal Fiddle Leaf Fig Tree',
    category: 'Trees',
    tag: 'Hotel Lobby',
    priceLkr: 24900,
    shortDesc: 'Sculptural broad-leaf canopy mounted on a textured natural hardwood-style trunk.',
    heightSpec: '160cm height · 26cm ceramic planter diameter',
    materialSpec: 'UV-stabilized silk-touch leaves with embossed veining, hand-sculpted timber-look trunk',
    placementSpec: 'Hotel lobbies, double-height living spaces, boardrooms, architectural foyers',
    potIncluded: 'Ribbed warm sandstone composite pot',
    tileIndex: 0,
    botanicalStyle: 'fiddle',
    inStock: true,
  },
  {
    id: 'tuscany-olive-tree-180',
    name: 'Mediterranean Olive Tree',
    category: 'Trees',
    tag: 'Designer Choice',
    priceLkr: 28500,
    shortDesc: 'Airy silver-green foliage with lifelike olives and an organic branching silhouette.',
    heightSpec: '180cm height · 25cm travertine-look pot diameter',
    materialSpec: 'Dual-tone sage & silver PEVA leaves, botanical fruit accents, fiberglass-reinforced trunk',
    placementSpec: 'Sunlit dining rooms, boutique cafes, villa courtyards, modern minimalist interiors',
    potIncluded: 'Weighted limestone-finish cylindrical pot',
    tileIndex: 8,
    botanicalStyle: 'olive',
    inStock: true,
  },
  {
    id: 'trailing-silver-eucalyptus',
    name: 'Trailing Silver Dollar Eucalyptus',
    category: 'Hanging Plants',
    tag: 'Shelf Favourite',
    priceLkr: 5850,
    shortDesc: 'Cascading frosted sage vines that drape effortlessly from bookshelves and pergolas.',
    heightSpec: '85cm cascading trail · 14cm matte pot diameter',
    materialSpec: 'Soft-touch frosted PEVA foliage, UV-resistant outdoor/indoor polymer stems',
    placementSpec: 'Floating wall shelves, balcony railings, reception backdrops, study desks',
    potIncluded: 'Matte sage ceramic hanging/shelf pot',
    tileIndex: 1,
    botanicalStyle: 'eucalyptus',
    inStock: true,
  },
  {
    id: 'phalaenopsis-orchid-arrangement',
    name: 'White Phalaenopsis Orchid in Ceramic',
    category: 'Flowers',
    tag: 'Gift Favourite',
    priceLkr: 11200,
    shortDesc: 'Three arching stems of real-touch ivory orchid blooms nestled in a low stone vessel.',
    heightSpec: '58cm height · 24cm oval ceramic bowl',
    materialSpec: 'Real-touch latex-coated petals, realistic buds, natural bark & moss bed in glazed stoneware',
    placementSpec: 'Dining table centrepieces, hotel reception desks, housewarming & corporate gifts',
    potIncluded: 'Hand-glazed off-white ceramic boat planter included',
    tileIndex: 5,
    botanicalStyle: 'orchid',
    inStock: true,
  },
  {
    id: 'bird-of-paradise-150',
    name: 'Giant Bird of Paradise (Strelitzia)',
    category: 'Trees',
    tag: 'Villa Essential',
    priceLkr: 21500,
    shortDesc: 'Bold upright banana-style paddles that bring coastal Sri Lankan resort vibes indoors.',
    heightSpec: '150cm height · 22cm weighted base pot',
    materialSpec: 'Heavy-gauge tear-resistant PEVA fronds, internal shaping wire, UV-shield coating',
    placementSpec: 'Poolside lounges, covered balconies, open-plan living areas, boutique resorts',
    potIncluded: 'Weighted black starter pot (fits neatly inside 28cm decorative baskets)',
    tileIndex: 3,
    botanicalStyle: 'strelitzia',
    inStock: true,
  },
  {
    id: 'emerald-boston-fern',
    name: 'Lush Cascading Boston Fern',
    category: 'Hanging Plants',
    tag: 'Balcony Ready',
    priceLkr: 6850,
    shortDesc: 'Dense, feathery 48-frond bush designed to thrive in humid or shaded verandahs with zero shedding.',
    heightSpec: '65cm spread · 16cm hanging bowl diameter',
    materialSpec: 'UV-protected high-density poly-botanical fronds, rust-proof braided hanger included',
    placementSpec: 'Verandah eaves, pergola beams, bathroom vanities, entryway planters',
    potIncluded: 'Terracotta-matte bowl with removable macrame hanger',
    tileIndex: 7,
    botanicalStyle: 'fern',
    inStock: true,
  },
  {
    id: 'spathiphyllum-peace-lily',
    name: 'Serene Peace Lily (Spathiphyllum)',
    category: 'Flowers',
    tag: 'Best for Gifts',
    priceLkr: 8900,
    shortDesc: 'Glossy deep emerald leaves crowned with creamy white spathe blossoms for calm interiors.',
    heightSpec: '75cm height · 18cm pot diameter',
    materialSpec: 'Real-touch PEVA spathe blooms, satin-finish ribbed leaves, weighted cement base',
    placementSpec: 'Bedside tables, meditation corners, clinic waiting rooms, sympathy & wellness gifts',
    potIncluded: 'Minimalist matte cream cylinder pot',
    tileIndex: 2,
    botanicalStyle: 'peacelily',
    inStock: true,
  },
  {
    id: 'golden-areca-palm-135',
    name: 'Ceylon Golden Areca Palm',
    category: 'Indoor Plants',
    tag: 'Tropical Classic',
    priceLkr: 16400,
    shortDesc: 'Feathery arching palm fronds with realistic speckled cane stems for breezy tropical warmth.',
    heightSpec: '135cm height · 20cm pot diameter',
    materialSpec: 'Multi-tone green UV-treated palm blades, natural fiber sheath detailing at base',
    placementSpec: 'Living rooms, covered patios, restaurant partitions, hotel corridors',
    potIncluded: 'Woven seagrass belly basket with inner weighted pot',
    tileIndex: 9,
    botanicalStyle: 'areca',
    inStock: true,
  },
  {
    id: 'fluted-travertine-planter-set',
    name: 'Fluted Travertine & Ceramic Planter Duo',
    category: 'Pots & Accessories',
    tag: 'Artisan Crafted',
    priceLkr: 9500,
    shortDesc: 'Architectural ribbed matte stone-finish planters designed to elevate any 90cm–180cm Bloomy tree.',
    heightSpec: 'Large: 32cm H × 30cm Ø · Medium: 24cm H × 24cm Ø',
    materialSpec: 'Lightweight fiber-stone & stoneware composite, scratch-safe felt floor pads, indoor/outdoor rated',
    placementSpec: 'Fits all Bloomy starter pots; includes bag of dried forest moss topper',
    potIncluded: 'Set of 2 nested architectural planters + forest moss pack',
    tileIndex: 6,
    botanicalStyle: 'planter',
    inStock: true,
  },
  {
    id: 'marble-queen-pothos-vine',
    name: 'Variegated Marble Queen Pothos',
    category: 'Hanging Plants',
    tag: 'Desk & Shelf',
    priceLkr: 5400,
    shortDesc: 'Cream-and-emerald heart-shaped leaves that brighten dark workspace corners without sunlight.',
    heightSpec: '75cm trailing length · 13cm ceramic pot',
    materialSpec: 'Variegated PEVA heart leaves, flexible trailing vines, weighted stoneware pot',
    placementSpec: 'Home office monitors, kitchen cabinets, bookcases, reception counters',
    potIncluded: 'Speckled oat ceramic pot included',
    tileIndex: 4,
    botanicalStyle: 'pothos',
    inStock: true,
  },
  {
    id: 'zen-oriental-bamboo-screen',
    name: 'Zen Black-Stem Bamboo Cluster',
    category: 'Indoor Plants',
    tag: 'Landscaper Pick',
    priceLkr: 19800,
    shortDesc: 'Slender natural-look culms with delicate whisper-green bamboo foliage for privacy screening.',
    heightSpec: '150cm height · 22cm heavy base pot',
    materialSpec: 'Real bamboo-textured polymer canes, UV-resistant dense silk-poly leaves',
    placementSpec: 'Office glass partitions, spa walkways, balcony privacy screens, courtyard walls',
    potIncluded: 'Matte slate cylinder planter with white river pebbles',
    tileIndex: 0,
    botanicalStyle: 'bamboo',
    inStock: true,
  },
];

/**
 * Formats an integer amount in Sri Lankan Rupees (e.g. LKR 14,500)
 */
export function formatLkr(amount: number): string {
  const rounded = Math.round(amount);
  return `LKR ${rounded.toLocaleString('en-US')}`;
}

/**
 * Computes the cylinder-curve card geometry for a given unpushed offset `t` (in frame units `u`, where stage is 1440x1080 and centre is x=720).
 * Specification:
 * - Normalised distance d = |x - 720| / 706
 * - Pushed centre x = 720 + t * (1 + 0.083 * (t / 706)^2)
 * - Width = 170 + 48 * d^2
 * - Each vertical edge's height = 280 + 92 * q^2.6, where q is that edge's own normalised distance |edgeX - 720| / 706
 * - Vertical centre sits at 687 - 12 * d^2
 */
export interface CardCylinderGeometry {
  centerX: number;
  centerY: number;
  width: number;
  leftHeight: number;
  rightHeight: number;
  maxHeight: number;
  d: number;
}

export function computeCardCylinderGeometry(t: number): CardCylinderGeometry {
  const ratioT = t / 706;
  const centerX = 720 + t * (1 + 0.083 * ratioT * ratioT);
  const d = Math.abs(centerX - 720) / 706;
  const width = 216 + 52 * d * d;

  const leftEdgeX = centerX - width / 2;
  const rightEdgeX = centerX + width / 2;

  const qLeft = Math.abs(leftEdgeX - 720) / 706;
  const qRight = Math.abs(rightEdgeX - 720) / 706;

  const leftHeight = 280 + 92 * Math.pow(qLeft, 2.6);
  const rightHeight = 280 + 92 * Math.pow(qRight, 2.6);
  const maxHeight = Math.max(leftHeight, rightHeight);
  const centerY = 687 - 12 * d * d;

  return {
    centerX,
    centerY,
    width,
    leftHeight,
    rightHeight,
    maxHeight,
    d,
  };
}

/**
 * Generates an SVG path string for a rounded quadrilateral with corner radius `r`.
 * Left vertical edge goes from yTL to yBL at x=0; Right vertical edge goes from yTR to yBR at x=w.
 */
export function buildRoundedQuadPath(
  w: number,
  leftHeight: number,
  rightHeight: number,
  r: number
): string {
  const maxH = Math.max(leftHeight, rightHeight);
  const yTL = (maxH - leftHeight) / 2;
  const yBL = yTL + leftHeight;
  const yTR = (maxH - rightHeight) / 2;
  const yBR = yTR + rightHeight;

  const safeR = Math.max(0, Math.min(r, w / 3, leftHeight / 3, rightHeight / 3));

  // Top edge vector from TL(0, yTL) to TR(w, yTR)
  const topDx = w;
  const topDy = yTR - yTL;
  const topLen = Math.hypot(topDx, topDy) || 1;
  const topUx = topDx / topLen;
  const topUy = topDy / topLen;

  // Bottom edge vector from BR(w, yBR) to BL(0, yBL)
  const botDx = -w;
  const botDy = yBL - yBR;
  const botLen = Math.hypot(botDx, botDy) || 1;
  const botUx = botDx / botLen;
  const botUy = botDy / botLen;

  // Start just below Top-Left on the left vertical edge, curve around TL to top edge
  const pTL_in_x = 0;
  const pTL_in_y = yTL + safeR;
  const pTL_out_x = safeR * topUx;
  const pTL_out_y = yTL + safeR * topUy;

  // Top-Right corner
  const pTR_in_x = w - safeR * topUx;
  const pTR_in_y = yTR - safeR * topUy;
  const pTR_out_x = w;
  const pTR_out_y = yTR + safeR;

  // Bottom-Right corner
  const pBR_in_x = w;
  const pBR_in_y = yBR - safeR;
  const pBR_out_x = w + safeR * botUx;
  const pBR_out_y = yBR + safeR * botUy;

  // Bottom-Left corner
  const pBL_in_x = -safeR * botUx;
  const pBL_in_y = yBL - safeR * botUy;
  const pBL_out_x = 0;
  const pBL_out_y = yBL - safeR;

  const f = (n: number) => n.toFixed(2);

  return [
    `M ${f(pTL_in_x)} ${f(pTL_in_y)}`,
    `Q 0 ${f(yTL)} ${f(pTL_out_x)} ${f(pTL_out_y)}`,
    `L ${f(pTR_in_x)} ${f(pTR_in_y)}`,
    `Q ${f(w)} ${f(yTR)} ${f(pTR_out_x)} ${f(pTR_out_y)}`,
    `L ${f(pBR_in_x)} ${f(pBR_in_y)}`,
    `Q ${f(w)} ${f(yBR)} ${f(pBR_out_x)} ${f(pBR_out_y)}`,
    `L ${f(pBL_in_x)} ${f(pBL_in_y)}`,
    `Q 0 ${f(yBL)} ${f(pBL_out_x)} ${f(pBL_out_y)}`,
    'Z',
  ].join(' ');
}

/**
 * Computes 5x2 video/poster grid tile dimensions and offsets for a card of (cardW, cardH).
 * Spec: "where the tile height is max(card height, card width / 0.7111)"
 */
export function computeTileGridTransform(
  cardW: number,
  cardH: number,
  tileIndex: number
): {
  gridWidth: number;
  gridHeight: number;
  offsetX: number;
  offsetY: number;
} {
  const aspect = 384 / 540; // ~0.711111
  const tileHeight = Math.max(cardH, cardW / aspect);
  const tileWidth = tileHeight * aspect;

  const col = ((tileIndex % 10) + 10) % 5;
  const row = Math.floor((((tileIndex % 10) + 10) % 10) / 5);

  const gridWidth = 5 * tileWidth;
  const gridHeight = 2 * tileHeight;

  const offsetX = -col * tileWidth - (tileWidth - cardW) / 2;
  const offsetY = -row * tileHeight - (tileHeight - cardH) / 2;

  return {
    gridWidth,
    gridHeight,
    offsetX,
    offsetY,
  };
}

/**
 * Filters products by category.
 */
export function filterProductsByCategory(
  products: Product[],
  category: CategoryId
): Product[] {
  if (category === 'All') return products;
  return products.filter((p) => p.category === category);
}

/**
 * Computes cart totals (itemCount, subtotal, deliveryFee, total).
 */
export function calculateCartTotals(
  items: CartItem[],
  deliveryMethod: DeliveryMethod,
  deliveryZone: DeliveryZone
): {
  itemCount: number;
  subtotalLkr: number;
  deliveryFeeLkr: number;
  totalLkr: number;
} {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalLkr = items.reduce(
    (sum, item) => sum + item.product.priceLkr * item.quantity,
    0
  );
  const deliveryFeeLkr =
    itemCount === 0 || deliveryMethod === 'pickup'
      ? 0
      : DELIVERY_RATES[deliveryZone].fee;
  const totalLkr = subtotalLkr + deliveryFeeLkr;

  return {
    itemCount,
    subtotalLkr,
    deliveryFeeLkr,
    totalLkr,
  };
}

/**
 * Validates customer checkout form inputs.
 */
export function validateCustomerForm(form: CustomerForm): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }
  const cleanedPhone = (form.phone || '').replace(/[\s\-()]/g, '');
  if (!cleanedPhone || !/^(\+?94|0)?[1-9]\d{8}$/.test(cleanedPhone)) {
    errors.phone = 'Please enter a valid Sri Lankan phone number (e.g., 077 123 4567).';
  }
  if (form.deliveryMethod === 'delivery') {
    if (!form.address || form.address.trim().length < 6) {
      errors.address = 'Please enter your full delivery street address and city.';
    }
  }
  return errors;
}

/**
 * Generates the pre-filled WhatsApp checkout URL and message text.
 */
export function buildWhatsAppOrderPayload(
  items: CartItem[],
  form: CustomerForm,
  orderId: string
): { url: string; message: string } {
  const totals = calculateCartTotals(items, form.deliveryMethod, form.deliveryZone);
  const deliveryLine =
    form.deliveryMethod === 'pickup'
      ? `Pickup at Showroom (${PICKUP_LOCATION.address})`
      : `Island-Wide Delivery — ${DELIVERY_RATES[form.deliveryZone].label}`;

  const itemLines = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.quantity} × ${item.product.name} — ${formatLkr(
          item.product.priceLkr * item.quantity
        )}`
    )
    .join('\n');

  const lines = [
    `🌿 *NEW BLOOMY ORDER — #${orderId}*`,
    `----------------------------------`,
    `*Customer:* ${form.name.trim()}`,
    `*Phone:* ${form.phone.trim()}`,
    `*Fulfillment:* ${deliveryLine}`,
  ];

  if (form.deliveryMethod === 'delivery') {
    lines.push(`*Delivery Address:* ${form.address.trim()}`);
  }

  lines.push(
    ``,
    `*Order Items:*`,
    itemLines,
    `----------------------------------`,
    `*Subtotal:* ${formatLkr(totals.subtotalLkr)}`,
    `*Delivery Fee:* ${
      totals.deliveryFeeLkr === 0 ? 'FREE (Pickup)' : formatLkr(totals.deliveryFeeLkr)
    }`,
    `*Total Payable:* *${formatLkr(totals.totalLkr)}*`,
    `*Payment Method:* Bank Transfer (${BANK_DETAILS.accountName} - ${BANK_DETAILS.bankName} A/C ${BANK_DETAILS.accountNumber})`
  );

  if (form.notes && form.notes.trim().length > 0) {
    lines.push(`*Gift / Special Note:* ${form.notes.trim()}`);
  }

  lines.push(
    ``,
    `_I will attach my bank transfer confirmation slip below. Thank you!_`
  );

  const message = lines.join('\n');
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return { url, message };
}
