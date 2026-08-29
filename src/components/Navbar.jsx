import React, { useState } from 'react';
import { ShoppingBag, Lock, Menu as MenuIcon, X } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export const Navbar = ({ settings, onOpenAdmin, cartCount = 0, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#1C1917]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Menú Hamburguesa (Mobile) */}
          <div className="flex items-center sm:hidden w-1/3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1C1917] hover:text-[#B89855] transition-colors p-2 -ml-2"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <MenuIcon size={24} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Navegación Desktop */}
          <div className="hidden sm:flex items-center space-x-8 w-1/3">
            <a href="#catalogo" className="text-sm tracking-widest uppercase text-[#1C1917] hover:text-[#B89855] transition-colors">Catálogo</a>
            <a href="#nosotros" className="text-sm tracking-widest uppercase text-[#1C1917] hover:text-[#B89855] transition-colors">Nosotros</a>
          </div>

          {/* Logo Central (Tipográfico) */}
          <div className="flex-1 sm:flex-none flex justify-center w-1/3 sm:w-auto">
            <a href="#" className="flex flex-col items-center group">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[#1C1917] uppercase font-light group-hover:opacity-80 transition-opacity">
                {settings?.storeName || STORE_CONFIG?.name || 'Evangeline'}
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#B89855] uppercase mt-1 font-medium">
                Pastelería de Autor
              </span>
            </a>
          </div>

          {/* Carrito y Admin */}
          <div className="flex justify-end items-center w-1/3 space-x-4">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-[#1C1917]/30 hover:text-[#1C1917] transition-colors hidden sm:block"
              title="Panel de Administración"
            >
              <Lock size={18} strokeWidth={1.5} />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#1C1917] hover:text-[#B89855] transition-colors flex items-center gap-2"
            >
              <span className="hidden lg:block text-sm tracking-widest uppercase mt-1">Cart</span>
              <div className="relative">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#B89855] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
        <div className="sm:hidden bg-[#FAF7F2] border-t border-[#1C1917]/10 px-4 pt-2 pb-4 shadow-lg">
          <a onClick={() => setIsMobileMenuOpen(false)} href="#catalogo" className="block px-3 py-4 text-sm tracking-widest uppercase text-[#1C1917] border-b border-[#1C1917]/5">Catálogo</a>
          <a onClick={() => setIsMobileMenuOpen(false)} href="#nosotros" className="block px-3 py-4 text-sm tracking-widest uppercase text-[#1C1917] border-b border-[#1C1917]/5">Nosotros</a>
          <button onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-4 text-sm tracking-widest uppercase text-[#1C1917]/40 flex items-center gap-2">
            <Lock size={16} /> Administración
          </button>
        </div>
      )}
    </nav>
  );
};