import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Sparkles } from 'lucide-react';
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
        image: '',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-sm shadow-2xl border border-[#1C1917]/10 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#1C1917]/10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B89855]" strokeWidth={1.5} />
            <h3 className="font-serif text-xl tracking-wide text-[#1C1917] uppercase">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1C1917]/50 hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1C1917] mb-2">Nombre *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] focus:ring-0 bg-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1C1917] mb-2">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] bg-transparent outline-none uppercase tracking-wider"
              >
                {categories.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1C1917] mb-2">Precio ($) *</label>
              <input
                type="number"
                required
                min="0"
                step="500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] bg-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1C1917] mb-2">Porciones</label>
              <input
                type="text"
                value={formData.portions}
                onChange={(e) => setFormData({ ...formData, portions: e.target.value })}
                className="w-full text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] bg-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1C1917] mb-2">Anticipación (Hs)</label>
              <input
                type="number"
                value={formData.leadTimeHours}
                onChange={(e) => setFormData({ ...formData, leadTimeHours: e.target.value })}
                className="w-full text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1C1917] mb-2">Descripción</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] bg-transparent outline-none resize-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#1C1917] mb-2">
              <ImageIcon className="w-4 h-4 text-[#B89855]" strokeWidth={1.5} />
              URL de la Imagen
            </label>
            <div className="flex gap-4 items-start">
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://ejemplo.com/foto.jpg"
                className="flex-1 text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] bg-transparent outline-none"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-sm border border-[#1C1917]/10" />
              )}
            </div>
            <p className="text-[10px] text-[#1C1917]/50 mt-1 uppercase tracking-wide">Pegá el link de una imagen (Ej: Instagram o Pinterest) para no saturar la memoria.</p>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1C1917] mb-2">Etiquetas</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full text-sm p-3 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] bg-transparent outline-none"
            />
          </div>

          {/* Toggles */}
          <div className="pt-2 grid grid-cols-3 gap-4">
            {['featured', 'isNew', 'active'].map((field) => (
              <label key={field} className="flex items-center justify-center gap-2 p-3 border border-[#1C1917]/10 rounded-sm cursor-pointer hover:border-[#B89855]/50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.checked })}
                  className="rounded-sm text-[#B89855] focus:ring-0 border-[#1C1917]/20"
                />
                <span className="text-xs uppercase tracking-widest text-[#1C1917]">
                  {field === 'featured' ? 'Destacado' : field === 'isNew' ? 'Novedad' : 'Activo'}
                </span>
              </label>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-6 mt-6 border-t border-[#1C1917]/10 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-xs tracking-widest uppercase text-[#1C1917] hover:text-[#B89855] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#1C1917] text-[#FAF7F2] text-xs tracking-widest uppercase rounded-sm hover:bg-[#1C1917]/90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};