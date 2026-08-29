import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ settings }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalAmount,
    totalItemsCount,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const formattedSubtotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(totalAmount);

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#D4AF37]/30">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1917] text-[#D4AF37] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#1C1917]">
                  Tu Pedido
                </h3>
                <span className="text-xs text-stone-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-[#1C1917] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-stone-300 stroke-1" />
                <p className="text-sm font-medium text-stone-600">Tu carrito está vacío</p>
                <p className="text-xs text-stone-400 mt-1">Elegí tus delicias favoritas para comenzar</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-[#1C1917] text-[#D4AF37] text-xs font-semibold rounded-full hover:bg-[#292524] transition-all cursor-pointer"
                >
                  Explorar Menú
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = new Intl.NumberFormat('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  maximumFractionDigits: 0,
                }).format(item.price * item.quantity);

                return (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-18 h-18 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif-title text-xs sm:text-sm font-bold text-[#1C1917] line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-stone-300 hover:text-red-500 transition-colors p-1"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.customNote && (
                          <p className="text-[11px] text-[#8A6D3B] italic bg-[#FAF7F2] p-1 rounded mt-1 line-clamp-1">
                            "{item.customNote}"
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 rounded-full bg-[#FAF7F2] p-0.5">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-stone-600 hover:bg-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#1C1917]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-stone-600 hover:bg-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs sm:text-sm font-bold text-[#1C1917] font-serif">
                          {itemPrice}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-stone-200 space-y-4">
              
              {/* Notice pill */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F4EFEA] text-[11px] text-[#8A6D3B] border border-[#D4AF37]/30">
                <Clock className="w-4 h-4 shrink-0 text-[#8A6D3B]" />
                <span>
                  Recordá que los pedidos se elaboran artesanalmente con {settings?.minNoticeHours || 48}hs de anticipación.
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  Subtotal
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#1C1917] font-serif">
                  {formattedSubtotal}
                </span>
              </div>

              <button
                onClick={handleStartCheckout}
                className="w-full py-4 bg-[#1C1917] text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-2xl hover:bg-[#292524] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer border border-[#D4AF37]/50 group"
              >
                <span>Completar Pedido por WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
