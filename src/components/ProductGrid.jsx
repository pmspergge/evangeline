import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { Sparkles, Cookie } from 'lucide-react';

export const ProductGrid = ({ products, categories }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.active) return false;
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Grid of products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white/60 rounded-3xl border border-stone-200">
          <Cookie className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif-title text-lg font-bold text-stone-700">
            No encontramos productos con ese filtro
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Probá buscando otra palabra o seleccioná "Todos los productos".
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#1C1917] text-[#D4AF37] text-xs font-semibold rounded-full hover:bg-[#292524] transition-all cursor-pointer"
          >
            Ver todos los productos
          </button>
        </div>
      )}

    </section>
  );
};
