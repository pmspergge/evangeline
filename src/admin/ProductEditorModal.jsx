import React, { useState, useEffect } from 'react';
import { X, Save, Image, Sparkles, AlertCircle } from 'lucide-react';
import { storage } from '../services/storage';

export const ProductEditorModal = ({ isOpen, onClose, product, categories, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'tortas',
    price: 30000,
    portions: '10 a 12 porciones',
    description: '',
    image: '',
    featured: false,
    isNew: false,
    active: true,
    leadTimeHours: 48,
    tags: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'tortas',
        price: product.price || 0,
        portions: product.portions || '',
        description: product.description || '',
        image: product.image || '',
        featured: Boolean(product.featured),
        isNew: Boolean(product.isNew),
        active: product.active !== undefined ? product.active : true,
        leadTimeHours: product.leadTimeHours || 48,
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
      });
    } else {
      setFormData({
        name: '',
        category: 'tortas',
        price: 25000,
        portions: '10 a 12 porciones',
        description: '',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
        featured: false,
        isNew: true,
        active: true,
        leadTimeHours: 48,
        tags: 'Nuevo, Artesanal',
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Completá al menos el nombre y el precio del producto.');
      return;
    }

    const cleanedData = {
      ...formData,
      price: Number(formData.price),
      leadTimeHours: Number(formData.leadTimeHours),
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    if (product && product.id) {
      storage.updateProduct(product.id, cleanedData);
    } else {
      storage.addProduct(cleanedData);
    }

    onSaveSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-stone-200 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8A6D3B]" />
            <h3 className="font-serif-title text-lg font-bold text-[#1C1917]">
              {product ? 'Editar Producto' : 'Nuevo Producto en Catálogo'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-[#1C1917] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1C1917] mb-1">
                Nombre del Producto *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Torta Pavlova de Frutos Rojos"
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] mb-1">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
              >
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1C1917] mb-1">
                Precio en ARS ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] mb-1">
                Rendimiento / Porciones
              </label>
              <input
                type="text"
                value={formData.portions}
                onChange={(e) => setFormData({ ...formData, portions: e.target.value })}
                placeholder="Ej: 10 a 12 porciones"
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] mb-1">
                Anticipación (Horas)
              </label>
              <input
                type="number"
                value={formData.leadTimeHours}
                onChange={(e) => setFormData({ ...formData, leadTimeHours: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1917] mb-1">
              Descripción & Rellenos
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describí los ingredientes nobles, capas de bizcochuelo, ganache, frosting..."
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1917] mb-1 flex items-center gap-1">
              <Image className="w-3.5 h-3.5 text-[#8A6D3B]" />
              URL de la Fotografía
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
            />
            {formData.image && (
              <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden border border-stone-300 bg-stone-100">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1917] mb-1">
              Etiquetas (separadas por coma)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Destacado, Sin TACC, Chocolate belga, Pistacho..."
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
            />
          </div>

          {/* Toggles */}
          <div className="pt-2 grid grid-cols-3 gap-3">
            <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="text-xs font-semibold text-[#1C1917]">Destacado</span>
            </label>

            <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="text-xs font-semibold text-[#1C1917]">Novedad</span>
            </label>

            <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="text-xs font-semibold text-[#1C1917]">En Catálogo</span>
            </label>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1C1917] text-[#D4AF37] font-semibold text-xs rounded-xl hover:bg-[#292524] transition-all flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Producto</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
