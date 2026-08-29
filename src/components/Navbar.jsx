import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#1C1917]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Menú Hamburguesa (Mobile) */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1C1917] hover:opacity-70 transition-opacity p-2"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Navegación Desktop */}
          <div className="hidden sm:flex space-x-8 w-1/3">
            <a href="#catalogo" className="text-sm tracking-widest uppercase text-[#1C1917] hover:opacity-70 transition-opacity">Catálogo</a>
            <a href="#nosotros" className="text-sm tracking-widest uppercase text-[#1C1917] hover:opacity-70 transition-opacity">Nosotros</a>
          </div>

          {/* Logo Central (Diseño Corregido) */}
          <div className="flex-1 flex justify-center w-1/3">
            <a href="#" className="flex flex-col items-center">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[#1C1917] uppercase font-light">
                {STORE_CONFIG.name}
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#1C1917]/60 uppercase mt-1">
                Pastelería de Autor
              </span>
            </a>
          </div>

          {/* Carrito */}
          <div className="flex justify-end items-center w-1/3">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#1C1917] hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              <span className="hidden sm:block text-sm tracking-widest uppercase mt-1">Cart</span>
              <div className="relative">
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1C1917] text-[#FAF7F2] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Menú Desplegable Mobile */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF7F2] border-t border-[#1C1917]/10 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <a href="#catalogo" className="block px-3 py-3 text-base tracking-widest uppercase text-[#1C1917] border-b border-[#1C1917]/5">Catálogo</a>
          <a href="#nosotros" className="block px-3 py-3 text-base tracking-widest uppercase text-[#1C1917]">Nosotros</a>
        </div>
      )}
    </nav>
  );
}