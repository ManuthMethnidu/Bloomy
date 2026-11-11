import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import {
  BANK_DETAILS,
  CartItem,
  CustomerForm,
  DELIVERY_RATES,
  DeliveryMethod,
  DeliveryZone,
  PICKUP_LOCATION,
  ValidationErrors,
  buildWhatsAppOrderPayload,
  calculateCartTotals,
  formatLkr,
  validateCustomerForm,
} from '../utils/storeLogic';
import { BotanicalVisual } from './BotanicalVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [form, setForm] = useState<CustomerForm>({
    name: '',
    phone: '',
    address: '',
    deliveryMethod: 'delivery',
    deliveryZone: 'colombo',
    notes: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    url: string;
    message: string;
  } | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const totals = calculateCartTotals(
    items,
    form.deliveryMethod,
    form.deliveryZone
  );

  const handleFieldChange = <K extends keyof CustomerForm>(
    field: K,
    value: CustomerForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setConfirmedOrder(null);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const validationErrors = validateCustomerForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const orderId = `BLM-${Math.floor(1000 + (totals.totalLkr % 8999))}`;
    const payload = buildWhatsAppOrderPayload(items, form, orderId);
    setConfirmedOrder({
      orderId,
      url: payload.url,
      message: payload.message,
    });
    setTimeout(() => {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 30);
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(BANK_DETAILS.accountNumber).catch(() => {});
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg h-full bg-[#F5F8EF] text-[#101410] flex flex-col shadow-2xl border-l border-[#08482D]/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-white border-b border-[#101410]/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#08482D]" />
            <h2
              id="cart-drawer-title"
              className="font-display text-lg font-bold text-[#101410]"
            >
              Your Bloomy Basket ({totals.itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="w-9 h-9 rounded-full hover:bg-[#EDF3E4] flex items-center justify-center text-[#101410] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
        >
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div
                className="w-16 h-16 rounded-2xl bg-[#DAE7C7]/60 text-[#08482D] flex items-center justify-center mx-auto"
              >
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#101410]">
                Your basket is currently empty
              </h3>
              <p className="text-sm text-[#5E5E61] max-w-xs mx-auto">
                Explore our zero-maintenance indoor plants, statement trees, and ceramic planters.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#08482D] text-[#F5F8EF] text-sm font-semibold hover:bg-[#0B5E3B] transition-colors cursor-pointer"
              >
                Browse Botanicals
              </button>
            </div>
          ) : (
            <>
              {/* Confirmed Order Summary & WhatsApp Action Card right at top when generated */}
              {confirmedOrder && (
                <div
                  data-testid="whatsapp-order-ready"
                  className="p-4 rounded-2xl bg-[#DAE7C7] border border-[#08482D]/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#08482D]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Order #{confirmedOrder.orderId} Formatted & Ready</span>
                    </div>
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-[11px] font-medium text-[#08482D] underline cursor-pointer"
                    >
                      Clear Basket
                    </button>
                  </div>

                  <pre className="text-[11px] leading-relaxed font-mono bg-white/90 p-3 rounded-xl text-[#101410] whitespace-pre-wrap max-h-40 overflow-y-auto border border-[#08482D]/15">
                    {confirmedOrder.message}
                  </pre>

                  <a
                    href={confirmedOrder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#08482D] hover:bg-[#0B5E3B] text-[#F5F8EF] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Launch WhatsApp Chat ({confirmedOrder.orderId})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
              {/* 1. Itemized Cart List */}
              <div className="space-y-3" aria-label="Cart items">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#101410]/10"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#08482D]/10">
                      <BotanicalVisual style={product.botanicalStyle} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#101410] truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#5E5E61] tabular-nums">
                        {formatLkr(product.priceLkr)} each
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center bg-[#F5F8EF] border border-[#101410]/10 rounded-lg h-7 px-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="w-6 h-6 flex items-center justify-center text-[#101410] hover:text-[#08482D] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className="w-6 h-6 flex items-center justify-center text-[#101410] hover:text-[#08482D] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#08482D] tabular-nums">
                            {formatLkr(product.priceLkr * quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Remove ${product.name} from cart`}
                            className="p-1 text-[#5E5E61] hover:text-red-700 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Delivery & Pickup Selector */}
              <div className="space-y-3 pt-2 border-t border-[#101410]/10">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#5E5E61]">
                  Fulfillment Method
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  {(
                    [
                      {
                        id: 'delivery',
                        title: 'Island-Wide Delivery',
                        sub: '1–4 Working Days',
                        icon: Truck,
                      },
                      {
                        id: 'pickup',
                        title: 'Optional Pickup',
                        sub: 'Colombo 05 · Free',
                        icon: MapPin,
                      },
                    ] as const
                  ).map((mode) => {
                    const Icon = mode.icon;
                    const active = form.deliveryMethod === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() =>
                          handleFieldChange(
                            'deliveryMethod',
                            mode.id as DeliveryMethod
                          )
                        }
                        aria-pressed={active}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#EDF3E4] border-[#08482D] text-[#101410]'
                            : 'bg-white border-[#101410]/10 text-[#5E5E61] hover:border-[#08482D]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-semibold text-xs text-[#101410]">
                          <Icon className="w-4 h-4 text-[#08482D] shrink-0" />
                          <span>{mode.title}</span>
                        </div>
                        <span className="block text-[11px] text-[#5E5E61] mt-0.5">
                          {mode.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {form.deliveryMethod === 'delivery' ? (
                  <div className="p-3.5 rounded-xl bg-white border border-[#101410]/10 space-y-2">
                    <span className="block text-xs font-semibold text-[#101410]">
                      Select Delivery Zone
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {(['colombo', 'outstation'] as DeliveryZone[]).map((zone) => {
                        const rate = DELIVERY_RATES[zone];
                        const active = form.deliveryZone === zone;
                        return (
                          <label
                            key={zone}
                            className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer ${
                              active
                                ? 'bg-[#F5F8EF] border-[#08482D] font-semibold'
                                : 'border-[#101410]/10 text-[#5E5E61]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="deliveryZone"
                                checked={active}
                                onChange={() =>
                                  handleFieldChange('deliveryZone', zone)
                                }
                                className="accent-[#08482D]"
                              />
                              <span>{rate.label}</span>
                            </div>
                            <span className="font-bold text-[#08482D] tabular-nums">
                              {formatLkr(rate.fee)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-[#EDF3E4] border border-[#08482D]/20 text-xs space-y-1">
                    <div className="font-semibold text-[#08482D]">
                      {PICKUP_LOCATION.title}
                    </div>
                    <div className="text-[#101410]">{PICKUP_LOCATION.address}</div>
                    <div className="text-[#5E5E61]">{PICKUP_LOCATION.hours}</div>
                  </div>
                )}
              </div>

              {/* 3. Customer Details Form */}
              <form
                id="whatsapp-checkout-form"
                onSubmit={handleCheckoutSubmit}
                noValidate
                className="space-y-3.5 pt-2 border-t border-[#101410]/10"
              >
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#5E5E61]">
                  Customer Details
                </span>

                <div>
                  <label
                    htmlFor="cust-name"
                    className="block text-xs font-medium text-[#101410] mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="cust-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="e.g., Dilshan Jayawardena"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#101410]/15 text-sm focus:outline-2 focus:outline-[#08482D]"
                  />
                  {errors.name && (
                    <p role="alert" className="text-xs text-red-700 mt-1 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cust-phone"
                    className="block text-xs font-medium text-[#101410] mb-1"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="cust-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="e.g., 077 123 4567"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#101410]/15 text-sm focus:outline-2 focus:outline-[#08482D]"
                  />
                  {errors.phone && (
                    <p role="alert" className="text-xs text-red-700 mt-1 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {form.deliveryMethod === 'delivery' && (
                  <div>
                    <label
                      htmlFor="cust-address"
                      className="block text-xs font-medium text-[#101410] mb-1"
                    >
                      Delivery Street Address & City *
                    </label>
                    <textarea
                      id="cust-address"
                      rows={2}
                      value={form.address}
                      onChange={(e) =>
                        handleFieldChange('address', e.target.value)
                      }
                      placeholder="House/Apt No, Street, Town/City (e.g., 18 Barnes Place, Colombo 07)"
                      className="w-full p-3 rounded-xl bg-white border border-[#101410]/15 text-sm focus:outline-2 focus:outline-[#08482D]"
                    />
                    {errors.address && (
                      <p
                        role="alert"
                        className="text-xs text-red-700 mt-1 font-medium"
                      >
                        {errors.address}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="cust-notes"
                    className="block text-xs font-medium text-[#101410] mb-1"
                  >
                    Special Note or Gift Message (Optional)
                  </label>
                  <input
                    id="cust-notes"
                    type="text"
                    value={form.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                    placeholder="e.g., Include a complimentary housewarming gift card"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#101410]/15 text-sm focus:outline-2 focus:outline-[#08482D]"
                  />
                </div>
              </form>

              {/* 4. Payment Options Section */}
              <div className="space-y-3 pt-2 border-t border-[#101410]/10">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#5E5E61]">
                  Payment Method
                </span>

                {/* Active Now: Sri Lankan Bank Transfer */}
                <div className="p-4 rounded-2xl bg-white border border-[#08482D]/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-xs text-[#08482D]">
                      <Building2 className="w-4 h-4" />
                      <span>Direct Bank Transfer · Active Now</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#08482D] hover:underline cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedAccount ? 'Copied!' : 'Copy A/C'}</span>
                    </button>
                  </div>

                  <div className="text-xs space-y-1 text-[#101410] bg-[#F5F8EF] p-3 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-[#5E5E61]">Bank:</span>
                      <span className="font-semibold">{BANK_DETAILS.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E5E61]">Account Name:</span>
                      <span className="font-semibold">{BANK_DETAILS.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E5E61]">Account Number:</span>
                      <span className="font-mono font-bold text-[#08482D] tabular-nums">
                        {BANK_DETAILS.accountNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E5E61]">Branch:</span>
                      <span className="font-medium">{BANK_DETAILS.branch}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#5E5E61] italic">
                    Attach your transfer slip in WhatsApp after placing the order.
                  </p>
                </div>

                {/* Future Digital & BNPL Gateways (Visual Placeholders) */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] text-[#5E5E61]">
                    Digital & Installment Gateways
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        name: 'PayHere',
                        desc: 'Visa / MC / LankaQR',
                      },
                      {
                        name: 'Koko',
                        desc: '3 × 0% Installments',
                      },
                      {
                        name: 'MintPay',
                        desc: 'Split in 3 Payments',
                      },
                    ].map((gw) => (
                      <div
                        key={gw.name}
                        className="p-2.5 rounded-xl bg-white/70 border border-[#101410]/10 text-left opacity-80"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-display font-bold text-xs text-[#101410]">
                            {gw.name}
                          </span>
                          <span className="text-[9px] font-semibold uppercase tracking-wide text-[#08482D]">
                            Coming Soon
                          </span>
                        </div>
                        <span className="block text-[10px] text-[#5E5E61] mt-0.5 truncate">
                          {gw.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Drawer Footer with Totals & Primary WhatsApp Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#101410]/10 space-y-3 shrink-0">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#5E5E61]">
                <span>Subtotal ({totals.itemCount} items)</span>
                <span className="tabular-nums font-medium text-[#101410]">
                  {formatLkr(totals.subtotalLkr)}
                </span>
              </div>
              <div className="flex justify-between text-[#5E5E61]">
                <span>
                  {form.deliveryMethod === 'pickup'
                    ? 'Showroom Pickup (Colombo 05)'
                    : `Delivery (${
                        form.deliveryZone === 'colombo'
                          ? 'Colombo & Suburbs'
                          : 'Outstation'
                      })`}
                </span>
                <span className="tabular-nums font-medium text-[#101410]">
                  {totals.deliveryFeeLkr === 0
                    ? 'FREE'
                    : formatLkr(totals.deliveryFeeLkr)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#101410] pt-1 border-t border-[#101410]/10">
                <span>Total in LKR</span>
                <span
                  data-testid="cart-total-lkr"
                  className="text-[#08482D] tabular-nums"
                >
                  {formatLkr(totals.totalLkr)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="whatsapp-checkout-form"
              className="w-full h-12 rounded-xl bg-[#08482D] hover:bg-[#0B5E3B] text-[#F5F8EF] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp — {formatLkr(totals.totalLkr)}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
