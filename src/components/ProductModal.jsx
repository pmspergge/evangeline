import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal = () => {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  const handleClose = () => {
    setSelectedProductForModal(null);
    setQuantity(1);
    setCustomNote('');
  };

  const handleAdd = () => {
    addToCart(product, quantity, customNote);
    handleClose();
  };

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.price * quantity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
      
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/40 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1C1917]/80 text-[#FAF7F2] hover:bg-[#1C1917] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-stone-100 min-h-[240px] md:min-h-full">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden"></div>
          
          {product.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#1C1917] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Destacado
              </span>
            </div>
          )}
        </div>

        {/* Details & Customization Options */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#8A6D3B] uppercase tracking-wider mb-2">
              <span>{product.portions}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {product.leadTimeHours || 48}hs de anticipación
              </span>
            </div>

            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {product.name}
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Custom Dedication Note input */}
            <div className="mt-6">
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#8A6D3B]" />
                Dedicatoria o mensaje personalizado (Opcional)
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ej: 'Feliz Cumple Valen', agregar velita, sin nueces, etc."
                rows={2}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white transition-colors resize-none placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Quantity and Price Footer */}
          <div className="mt-8 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] text-stone-500 uppercase block tracking-wider font-medium">
                  Total estimado
                </span>
                <span className="text-2xl font-bold text-[#1C1917] font-serif">
                  {formattedPrice}
                </span>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center border border-stone-300 rounded-full bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#1C1917]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full py-3.5 bg-[#1C1917] text-[#FAF7F2] rounded-2xl font-semibold text-xs sm:text-sm hover:bg-[#292524] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer border border-[#D4AF37]/50 group"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Agregar al pedido ({formattedPrice})</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
