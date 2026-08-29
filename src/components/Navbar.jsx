import React, { useState } from 'react';
import { ShoppingBag, Lock, Menu as MenuIcon, X } from 'lucide-react';

export function Navbar({
  activeCategory,
  onCategoryChange,
  onOpenCart,
  cartCount,
  onAdminClick,
  onHomeClick
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Categorías con IDs en texto plano para evitar errores de importación
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'tortas', name: 'Tortas & Pasteles' },
    { id: 'tartas', name: 'Tartas' },
    { id: 'boxes', name: 'Boxes' },
    { id: 'galletitas', name: 'Galletitas' },
    { id: 'individuales', name: 'Individuales' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#1C1917]/10">
      {/* Top Banner */}
      <div className="bg-[#1C1917] text-[#FAF7F2] text-xs py-1.5 text-center tracking-widest uppercase font-light">
        Pedidos con mínimo 48hs de anticipación • La Plata
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo / Marca */}
          <button
            onClick={onHomeClick}
            className="text-left group transition-opacity hover:opacity-80"
          >
            <span className="font-serif text-2xl md:text-3xl text-[#1C1917] tracking-tight block">
              Evangeline
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89855] font-medium block">
              Pastelería de Autor
            </span>
          </button>

          {/* Categorías - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-all rounded-sm ${activeCategory === cat.id
                    ? 'text-[#B89855] font-semibold border-b-2 border-[#B89855]'
                    : 'text-[#1C1917]/70 hover:text-[#1C1917]'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>

          {/* Acciones (Carrito & Admin Login) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#1C1917] hover:text-[#B89855] transition-colors flex items-center gap-2"
              aria-label="Carrito de compras"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B89855] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onAdminClick}
              className="p-2 text-[#1C1917]/40 hover:text-[#1C1917] transition-colors"
              title="Panel de Administración"
            >
              <Lock size={18} strokeWidth={1.5} />
            </button>

            {/* Hamburguesa Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1C1917]"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile Desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#1C1917]/10 px-4 py-4 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onCategoryChange(cat.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 text-sm tracking-wider uppercase transition-colors ${activeCategory === cat.id
                  ? 'text-[#B89855] font-semibold bg-[#B89855]/5'
                  : 'text-[#1C1917]/70'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}