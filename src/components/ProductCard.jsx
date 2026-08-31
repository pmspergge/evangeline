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
    <div className="group cursor-pointer flex flex-col bg-transparent h-full">
      {/* Image Container */}
      <div 
        className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-[#1C1917]/5" 
        onClick={() => setSelectedProductForModal(product)}
      >
        <img
          src={product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Minimalist Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Badges - Editorial Style */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.featured && (
            <span className="flex items-center gap-1 px-3 py-1 bg-[#1C1917] text-[#FAF7F2] text-[9px] font-bold tracking-[0.2em] uppercase rounded-sm">
              <Sparkles className="w-3 h-3 text-[#B89855]" strokeWidth={1.5} />
              Destacado
            </span>
          )}
          {product.isNew && (
            <span className="inline-block px-3 py-1 bg-[#FAF7F2] text-[#1C1917] text-[9px] font-bold tracking-[0.2em] uppercase rounded-sm shadow-sm">
              Nuevo
            </span>
          )}
        </div>
        
        {/* Quick view button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProductForModal(product);
          }}
          className="absolute bottom-4 right-4 w-10 h-10 bg-[#FAF7F2] text-[#1C1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#1C1917] hover:text-[#FAF7F2] rounded-sm shadow-sm"
          title="Ver detalle"
        >
          <Eye className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Meta tags */}
        <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-[#1C1917]/50 mb-2">
          <span className="font-medium">{product.portions || 'Pastelería'}</span>
          {product.leadTimeHours && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" strokeWidth={1.5} />
              {product.leadTimeHours}hs
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          onClick={() => setSelectedProductForModal(product)}
          className="font-serif text-xl text-[#1C1917] leading-snug group-hover:text-[#B89855] transition-colors line-clamp-2"
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-[#1C1917]/70 line-clamp-2 font-light leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-medium text-[#1C1917]">
            {formattedPrice}
          </span>

          <button
            onClick={() => addToCart(product, 1)}
            className="text-[10px] uppercase tracking-widest font-bold text-[#1C1917] hover:text-[#B89855] transition-colors flex items-center gap-1 border-b border-transparent hover:border-[#B89855] pb-0.5"
            title="Agregar al pedido"
          >
            Agregar <Plus className="w-3 h-3 hidden sm:block" />
          </button>
        </div>
      </div>
    </div>
  );
};