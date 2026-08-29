import React from 'react';
import { Sparkles, Cake, PieChart, Gift, Cookie, Coffee } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Cake,
  PieChart,
  Gift,
  Cookie,
  Coffee,
};

export const CategoryFilter = ({ categories, activeCategory, onSelectCategory, searchQuery, onSearchChange }) => {
  return (
    <div className="w-full mb-8">
      
      {/* Search Input & Title Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1C1917]">
            Nuestras Creaciones
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-normal mt-1">
            Seleccioná una categoría para explorar o buscá tu delicia favorita
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar torta, box, sabor..."
            className="w-full text-xs px-4 py-2.5 rounded-full border border-stone-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white transition-all shadow-xs placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Categories Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                isActive
                  ? 'bg-[#1C1917] text-[#D4AF37] border border-[#D4AF37] shadow-md scale-102'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-[#D4AF37]/50 hover:bg-[#F4EFEA]'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-stone-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
