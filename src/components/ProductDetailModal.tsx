import React, { useEffect, useState } from 'react';
import { Check, Minus, Plus, ShieldCheck, Truck, X } from 'lucide-react';
import { Product, formatLkr } from '../utils/storeLogic';
import { BotanicalVisual } from './BotanicalVisual';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [galleryView, setGalleryView] = useState<'front' | 'detail'>('front');

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setGalleryView('front');
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const totalLineLkr = product.priceLkr * quantity;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full md:max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F5F8EF] text-[#101410] rounded-t-3xl md:rounded-3xl border border-[#08482D]/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white hover:bg-[#DAE7C7] text-[#101410] flex items-center justify-center border border-[#101410]/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Image Gallery Preview */}
          <div className="md:col-span-6 p-5 md:p-7 flex flex-col gap-3 bg-[#EDF3E4]/70">
            <div className="relative aspect-4/3 md:aspect-square w-full rounded-2xl overflow-hidden border border-[#08482D]/10 bg-white">
              <BotanicalVisual
                style={product.botanicalStyle}
                viewVariant={galleryView}
              />
              <div className="absolute top-3 left-3 text-xs font-medium text-[#08482D] bg-[#F5F8EF]/90 backdrop-blur-xs px-3 py-1 rounded-md border border-[#08482D]/15">
                {product.category} · {product.tag}
              </div>
            </div>

            {/* Gallery View Switcher */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGalleryView('front')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  galleryView === 'front'
                    ? 'bg-[#08482D] text-[#F5F8EF] border-[#08482D]'
                    : 'bg-white text-[#101410] border-[#101410]/10 hover:bg-[#DAE7C7]/50'
                }`}
              >
                Full Studio Silhouette
              </button>
              <button
                type="button"
                onClick={() => setGalleryView('detail')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  galleryView === 'detail'
                    ? 'bg-[#08482D] text-[#F5F8EF] border-[#08482D]'
                    : 'bg-white text-[#101410] border-[#101410]/10 hover:bg-[#DAE7C7]/50'
                }`}
              >
                Foliage & Texture Close-Up
              </button>
            </div>
          </div>

          {/* Right Column: Specifications, Checklist & Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between gap-6">
            <div>
              {/* Availability & Category Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#08482D] mb-2 pr-12">
                <span className="inline-flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  In Stock — Ready to Dispatch
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#5E5E61]">SKU: {product.id.toUpperCase()}</span>
              </div>

              <h2
                id="modal-product-title"
                className="font-display text-2xl md:text-3xl font-bold text-[#101410] tracking-tight mb-2"
              >
                {product.name}
              </h2>

              <div className="text-2xl font-bold text-[#08482D] tabular-nums mb-3">
                {formatLkr(product.priceLkr)}
              </div>

              <p className="text-sm text-[#5E5E61] leading-relaxed mb-5">
                {product.shortDesc}
              </p>

              {/* Technical Botanical Specifications */}
              <div className="border-t border-b border-[#101410]/10 py-4 space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-[#101410] block text-xs uppercase tracking-wider text-[#5E5E61]">
                    Size / Height
                  </span>
                  <span className="text-[#101410] font-medium">
                    {product.heightSpec}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-[#101410] block text-xs uppercase tracking-wider text-[#5E5E61]">
                    Material & Craftsmanship
                  </span>
                  <span className="text-[#101410]">{product.materialSpec}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#101410] block text-xs uppercase tracking-wider text-[#5E5E61]">
                    Recommended Placement
                  </span>
                  <span className="text-[#101410]">{product.placementSpec}</span>
                </div>
              </div>

              {/* Care-Free Benefits Checklist */}
              <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5E5E61] mb-2.5">
                  Care-Free Botanical Benefits
                </h3>
                <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-[#101410]">
                  {[
                    'Zero watering required',
                    '100% allergy & pet friendly',
                    'Wipe-clean PEVA leaves',
                    'Stays vibrant year-round',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#DAE7C7] text-[#08482D] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Purchase Module: Quantity Selector & Add to Cart Button */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center bg-white border border-[#101410]/15 rounded-xl h-12 px-2"
                  aria-label="Quantity selector"
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-9 h-9 rounded-lg hover:bg-[#EDF3E4] flex items-center justify-center text-[#101410] transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span
                    data-testid="modal-quantity-value"
                    className="w-10 text-center font-semibold text-base tabular-nums"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-9 h-9 rounded-lg hover:bg-[#EDF3E4] flex items-center justify-center text-[#101410] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="flex-1 h-12 px-5 rounded-xl bg-[#08482D] hover:bg-[#0B5E3B] text-[#F5F8EF] font-semibold text-sm md:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Add to Cart — {formatLkr(totalLineLkr)}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#5E5E61]">
                <Truck className="w-4 h-4 text-[#08482D] shrink-0" />
                <span>
                  Colombo & Suburbs delivery in 1–2 days (LKR 450) · Island-wide 2–4 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
