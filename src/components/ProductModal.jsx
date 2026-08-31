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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1917]/80 backdrop-blur-sm animate-fade-in">
      
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-sm shadow-2xl border border-[#1C1917]/10 flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#FAF7F2] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer rounded-sm shadow-sm"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-[#1C1917]/5 min-h-[300px] md:min-h-full">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden"></div>
          
          {product.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="flex items-center gap-1 px-3 py-1 bg-[#1C1917] text-[#FAF7F2] text-[9px] font-bold tracking-[0.2em] uppercase rounded-sm">
                <Sparkles className="w-3 h-3 text-[#B89855]" strokeWidth={1.5} />
                Destacado
              </span>
            </div>
          )}
        </div>

        {/* Details & Customization Options */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#1C1917]/50 mb-4">
              <span className="font-medium">{product.portions || 'Pastelería'}</span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={1.5} />
                {product.leadTimeHours || 48}hs
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917] leading-tight">
              {product.name}
            </h2>

            <p className="mt-4 text-sm text-[#1C1917]/70 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Custom Dedication Note input */}
            <div className="mt-8">
              <label className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#1C1917] mb-3">
                <MessageSquare className="w-3 h-3 text-[#B89855]" strokeWidth={1.5} />
                Nota especial (Opcional)
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ej: 'Feliz Cumple Valen', agregar velita..."
                rows={2}
                className="w-full text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] focus:ring-0 bg-transparent outline-none transition-colors resize-none placeholder:text-[#1C1917]/30 font-light"
              />
            </div>
          </div>

          {/* Quantity and Price Footer */}
          <div className="mt-8 pt-6 border-t border-[#1C1917]/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#1C1917]/50 block mb-1">
                  Total estimado
                </span>
                <span className="text-2xl font-medium text-[#1C1917]">
                  {formattedPrice}
                </span>
              </div>

              {/* Minimalist Quantity Counter */}
              <div className="flex items-center border border-[#1C1917]/20 rounded-sm bg-transparent h-10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-[#1C1917]/50 hover:text-[#1C1917] hover:bg-[#1C1917]/5 transition-colors"
                >
                  <Minus className="w-3 h-3" strokeWidth={1.5} />
                </button>
                <span className="w-10 text-center text-xs font-medium text-[#1C1917]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-[#1C1917]/50 hover:text-[#1C1917] hover:bg-[#1C1917]/5 transition-colors"
                >
                  <Plus className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full py-4 bg-[#1C1917] text-[#FAF7F2] rounded-sm text-[10px] tracking-widest uppercase hover:bg-[#1C1917]/90 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#B89855]" strokeWidth={1.5} />
              Agregar al pedido
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};