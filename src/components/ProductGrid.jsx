import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { Cookie } from 'lucide-react';

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
    <section id="catalogo" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Grid of products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 px-4 border border-[#1C1917]/10 rounded-sm mt-8">
          <Cookie className="w-10 h-10 text-[#1C1917]/20 mx-auto mb-4" strokeWidth={1} />
          <h3 className="font-serif text-2xl text-[#1C1917] font-light">
            No encontramos esa delicia
          </h3>
          <p className="text-sm text-[#1C1917]/60 mt-2 max-w-sm mx-auto font-light">
            Intentá con otra palabra o explorá todo nuestro catálogo.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-8 px-8 py-3 bg-[#1C1917] text-[#FAF7F2] text-[10px] tracking-widest uppercase rounded-sm hover:bg-[#1C1917]/90 transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      )}

    </section>
  );
};