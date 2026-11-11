import React, { useMemo, useState } from 'react';
import {
  Check,
  Droplets,
  Eye,
  MessageCircle,
  Plus,
  ShoppingBag,
  Sparkles,
  Sun,
  Truck,
} from 'lucide-react';
import {
  CartItem,
  CategoryId,
  PICKUP_LOCATION,
  PRODUCTS,
  Product,
  UI_STRINGS,
  WHATSAPP_NUMBER,
  calculateCartTotals,
  filterProductsByCategory,
  formatLkr,
} from './utils/storeLogic';
import { HeroStage } from './components/HeroStage';
import { BotanicalVisual } from './components/BotanicalVisual';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { BloomyLogo } from './components/BloomyLogo';

const CATEGORIES: CategoryId[] = [
  'All',
  'Indoor Plants',
  'Hanging Plants',
  'Flowers',
  'Trees',
  'Pots & Accessories',
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(
    () => filterProductsByCategory(PRODUCTS, selectedCategory),
    [selectedCategory]
  );

  const cartTotals = useMemo(
    () => calculateCartTotals(cartItems, 'delivery', 'colombo'),
    [cartItems]
  );

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollToCatalog = (category?: CategoryId) => {
    if (category) {
      setSelectedCategory(category);
    }
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const bulkWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Bloomy Team! I would like to inquire about a bulk / commercial artificial plant order for our hotel, office, or landscaping project in Sri Lanka.'
  )}`;

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F5F8EF] text-[#101410]">
      {/* 1. HERO STAGE (Full-Width 1440×1080 Proportional Stage on Desktop, 640-scale on Mobile) */}
      <HeroStage
        cartCount={cartTotals.itemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToCatalog={handleScrollToCatalog}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-1">
        {/* 2. CARE-FREE VALUE STRIP */}
        <section
          id="care-free-strip"
          aria-label="Care-Free Botanical Benefits"
          className="w-full border-y border-[#08482D]/10 bg-[#EDF3E4]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  icon: Droplets,
                  title: 'No Watering',
                  desc: 'Stays lush through busy weeks and holidays',
                },
                {
                  icon: Sparkles,
                  title: 'No Mess or Soil',
                  desc: 'Zero mud, pests, or fallen leaf cleanup',
                },
                {
                  icon: Sun,
                  title: 'UV-Resistant / No Fading',
                  desc: 'Crafted for bright Sri Lankan verandas & windows',
                },
                {
                  icon: Truck,
                  title: 'Island-Wide Delivery',
                  desc: 'Colombo in 1–2 days · Outstation in 2–4 days',
                },
              ].map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#08482D]/10"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#DAE7C7] text-[#08482D] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-sm md:text-base text-[#101410]">
                        {feat.title}
                      </h2>
                      <p className="text-xs text-[#5E5E61] mt-0.5 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. CATEGORY FILTER & CURATED PRODUCT CATALOG */}
        <section
          id="catalog-section"
          aria-labelledby="catalog-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#08482D] mb-1.5">
                Sri Lanka Storefront · Direct Dispatch
              </p>
              <h2
                id="catalog-heading"
                className="font-display text-3xl md:text-4xl font-bold text-[#101410] tracking-tight"
              >
                {UI_STRINGS.catalogHeading}
              </h2>
              <p className="text-sm md:text-base text-[#5E5E61] mt-1.5 max-w-2xl">
                {UI_STRINGS.catalogSub}
              </p>
            </div>

            <div className="text-xs text-[#5E5E61] font-medium tabular-nums">
              Showing {filteredProducts.length} of {PRODUCTS.length} botanical pieces
            </div>
          </div>

          {/* Sticky Horizontal Category Filter Bar */}
          <div className="sticky top-0 z-30 -mx-4 px-4 py-3 bg-[#F5F8EF]/95 backdrop-blur-md border-b border-[#08482D]/10 mb-8">
            <div
              role="tablist"
              aria-label="Filter products by category"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#08482D] text-[#F5F8EF] shadow-xs'
                        : 'bg-white text-[#101410] border border-[#101410]/10 hover:bg-[#DAE7C7]/60'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid (2-col compact on mobile, 3-col on desktop) */}
          <div
            data-testid="product-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredProducts.map((product) => {
              const isAdded = justAddedId === product.id;
              return (
                <article
                  key={product.id}
                  className="group bg-white rounded-3xl border border-[#101410]/10 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {/* Botanical Artwork Container (clickable to open Product Modal) */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="relative aspect-4/3 w-full overflow-hidden cursor-pointer bg-[#EDF3E4]"
                  >
                    <BotanicalVisual style={product.botanicalStyle} />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {/* Quiet unboxed metadata kicker */}
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#5E5E61] mb-1.5">
                        <span className="text-[#08482D] font-semibold">
                          {product.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{product.tag}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-[#101410] group-hover:text-[#08482D] transition-colors">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="text-left cursor-pointer focus:outline-none"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="text-xs md:text-sm text-[#5E5E61] mt-1.5 line-clamp-2 leading-relaxed">
                        {product.shortDesc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#101410]/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="block text-[11px] text-[#5E5E61]">
                          Pot included
                        </span>
                        <span className="font-display text-base md:text-lg font-bold text-[#08482D] tabular-nums">
                          {formatLkr(product.priceLkr)}
                        </span>
                      </div>

                      {/* Dual Action: "View Details" & "+ Add" */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          aria-label={`View details for ${product.name}`}
                          className="h-10 px-3.5 rounded-xl bg-[#F5F8EF] hover:bg-[#DAE7C7] text-[#101410] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#08482D]" />
                          <span>View Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product, 1)}
                          aria-label={`Add ${product.name} to cart`}
                          className={`h-10 px-4 rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                            isAdded
                              ? 'bg-[#DAE7C7] text-[#08482D]'
                              : 'bg-[#08482D] hover:bg-[#0B5E3B] text-[#F5F8EF]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. AUDIENCE & COMMERCIAL / HOTEL CALLOUT BANNER */}
        <section
          id="commercial-callout"
          aria-labelledby="commercial-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="rounded-3xl bg-[#EDF3E4] border border-[#08482D]/15 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#08482D]">
                Tailored Across Sri Lanka · Trade & Bespoke Styling
              </div>
              <h2
                id="commercial-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#101410] tracking-tight"
              >
                Designed for Homeowners, Offices, Boutique Hotels, Landscapers & Gift Buyers
              </h2>
              <p className="text-sm sm:text-base text-[#5E5E61] leading-relaxed max-w-2xl">
                Whether you are styling a Colombo apartment balcony, outfitting a corporate workspace in Rajagiriya, curating a coastal resort lobby in Galle, or sending a lasting housewarming gift, our botanical specialists prepare custom pot pairings and volume quotes.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#101410]">
                <div>
                  <span className="font-bold text-[#08482D] block text-sm">
                    Homeowners & Gifts
                  </span>
                  <span>Complimentary gift notes & ready-to-place pots</span>
                </div>
                <div>
                  <span className="font-bold text-[#08482D] block text-sm">
                    Offices & Co-Working
                  </span>
                  <span>Zero-light desktop & boardroom greenery</span>
                </div>
                <div>
                  <span className="font-bold text-[#08482D] block text-sm">
                    Hotels & Landscapers
                  </span>
                  <span>Trade pricing on 10+ trees & custom green walls</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href={bulkWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 rounded-2xl bg-[#08482D] hover:bg-[#0B5E3B] text-[#F5F8EF] font-semibold text-sm flex items-center justify-center gap-2.5 transition-colors text-center"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Bulk / Hotel Inquiry via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="py-3.5 px-6 rounded-2xl bg-white hover:bg-[#DAE7C7]/60 text-[#101410] border border-[#101410]/10 font-semibold text-sm transition-colors cursor-pointer"
              >
                Open Cart & Delivery Calculator
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 5. FOOTER WITH DARK FOREST-GREEN BRAND SIGNATURE */}
      <footer className="bg-[#08482D] text-[#F5F8EF] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/15">
          <div className="md:col-span-5 space-y-3">
            <div className="text-3xl">
              <BloomyLogo variant="dark" />
            </div>
            <p className="text-xs sm:text-sm text-[#DAE7C7]/90 max-w-sm leading-relaxed">
              Fresh Greenery, Zero Maintenance. Premium lifelike indoor plants, architectural trees, and artisan planters delivered island-wide across Sri Lanka.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs sm:text-sm">
            <h3 className="font-semibold text-[#DAE7C7] uppercase tracking-wider text-xs">
              Collections
            </h3>
            <ul className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleScrollToCatalog(cat)}
                    className="text-[#F5F8EF]/85 hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs sm:text-sm">
            <h3 className="font-semibold text-[#DAE7C7] uppercase tracking-wider text-xs">
              Studio Showroom & Island-Wide Dispatch
            </h3>
            <p className="text-[#F5F8EF]/90 font-medium">
              {PICKUP_LOCATION.title}
            </p>
            <p className="text-[#F5F8EF]/75">{PICKUP_LOCATION.address}</p>
            <p className="text-[#F5F8EF]/75">{PICKUP_LOCATION.hours}</p>
            <p className="text-[#DAE7C7] pt-1 font-medium">
              WhatsApp Orders: +94 77 000 0000
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DAE7C7]/75">
          <span>© {new Date().getFullYear()} Bloomy (Pvt) Ltd. All rights reserved.</span>
          <span>Colombo · Kandy · Galle · Negombo · Jaffna · Island-Wide Delivery</span>
        </div>
      </footer>

      {/* 6. STICKY BOTTOM MOBILE CART BAR (≤ 820px, appears when cart has items) */}
      {cartTotals.itemCount > 0 && (
        <div className="min-[821px]:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-[#F5F8EF]/95 backdrop-blur-md border-t border-[#08482D]/15">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            data-testid="mobile-sticky-cart-bar"
            className="w-full h-12 px-5 rounded-2xl bg-[#08482D] text-[#F5F8EF] font-semibold text-sm flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>View Cart ({cartTotals.itemCount})</span>
            </div>
            <span className="tabular-nums font-bold">
              {formatLkr(cartTotals.subtotalLkr)}
            </span>
          </button>
        </div>
      )}

      {/* 7. PRODUCT DETAIL MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 8. SLIDE-OVER CART & WHATSAPP CHECKOUT DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
