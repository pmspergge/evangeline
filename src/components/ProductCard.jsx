import React from 'react';
import { Plus, Sparkles, Clock, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProductForModal } = useCart();

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
      
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => setSelectedProductForModal(product)}>
        <img
          src={product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#1C1917] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Destacado
            </span>
          )}
          {product.isNew && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#D4AF37] text-[#1C1917] shadow-md">
              Nuevo
            </span>
          )}
        </div>

        {/* Quick view hover icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProductForModal(product);
          }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-[#1C1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-md cursor-pointer"
          title="Ver detalle"
        >
          <Eye className="w-4 h-4 text-[#8A6D3B]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Portions / Category tag */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-medium text-[#8A6D3B] uppercase tracking-wider text-[11px]">
              {product.portions || 'Pastelería fina'}
            </span>
            {product.leadTimeHours && (
              <span className="flex items-center gap-1 text-[11px] text-stone-400">
                <Clock className="w-3 h-3" />
                {product.leadTimeHours}hs anticipación
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedProductForModal(product)}
            className="font-serif-title text-lg font-bold text-[#1C1917] group-hover:text-[#8A6D3B] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Precio</span>
            <span className="text-lg font-bold text-[#1C1917] font-serif">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProductForModal(product)}
              className="px-3 py-2 text-xs font-semibold text-[#8A6D3B] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              Detalles
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1C1917] text-[#D4AF37] hover:bg-[#292524] active:scale-90 transition-all shadow-md cursor-pointer border border-[#D4AF37]/40"
              title="Agregar al pedido"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
