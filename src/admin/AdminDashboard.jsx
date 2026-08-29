import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Package, Settings, LogOut, Plus, Edit2, Trash2, 
  CheckCircle, Clock, Truck, Eye, EyeOff, Save, Phone, Sparkles, Store
} from 'lucide-react';
import { storage } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { ProductEditorModal } from './ProductEditorModal';

export const AdminDashboard = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'settings'
  
  // Data states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState({});
  
  // Product Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({});
  const [saveSettingsToast, setSaveSettingsToast] = useState(false);

  const loadAllData = () => {
    setProducts(storage.getProducts());
    setCategories(storage.getCategories());
    setOrders(storage.getOrders());
    const currentSettings = storage.getSettings();
    setSettings(currentSettings);
    setSettingsForm(currentSettings);
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle active status of a product
  const handleToggleActive = (product) => {
    storage.updateProduct(product.id, { active: !product.active });
    loadAllData();
  };

  // Delete product
  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`¿Estás segura de eliminar "${name}" del catálogo?`)) {
      storage.deleteProduct(id);
      loadAllData();
    }
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    storage.updateOrderStatus(orderId, newStatus);
    loadAllData();
  };

  // Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    storage.saveSettings(settingsForm);
    setSettings(settingsForm);
    setSaveSettingsToast(true);
    setTimeout(() => setSaveSettingsToast(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      
      <div 
        className="relative w-full max-w-6xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 flex flex-col h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Admin Header */}
        <div className="p-4 sm:p-6 bg-[#1C1917] text-[#FAF7F2] flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/40 shrink-0">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-[#EFE9DF] shrink-0">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-white">
                  EVANGELINE
                </h2>
                <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#D4AF37]/40 uppercase">
                  Panel de Melisa
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {products.length} productos • {orders.length} pedidos registrados
              </p>
            </div>
          </div>

          {/* Tab navigation buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 p-1 rounded-2xl border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#D4AF37] text-[#1C1917] shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Productos</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#D4AF37] text-[#1C1917] shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedidos ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#D4AF37] text-[#1C1917] shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
          </div>

          {/* Close & Logout */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-stone-200 transition-colors cursor-pointer"
            >
              Ver Tienda
            </button>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="p-2 rounded-xl text-stone-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Tab 1: Products Manager */}
        {activeTab === 'products' && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-title text-xl font-bold text-[#1C1917]">
                  Gestión del Catálogo de Productos
                </h3>
                <p className="text-xs text-stone-500">
                  Podés pausar stock, cambiar precios o sumar nuevas creaciones en tiempo real
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsEditorOpen(true);
                }}
                className="px-4 py-2.5 bg-[#1C1917] text-[#D4AF37] font-semibold text-xs rounded-full hover:bg-[#292524] transition-all flex items-center gap-2 shadow-md cursor-pointer border border-[#D4AF37]/50"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nuevo Producto</span>
              </button>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className={`p-4 rounded-2xl border transition-all bg-white shadow-xs flex gap-4 items-start ${
                    prod.active ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-50'
                  }`}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-[#8A6D3B] uppercase tracking-wider">
                        {prod.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleActive(prod)}
                          className="p-1 text-stone-400 hover:text-[#1C1917]"
                          title={prod.active ? 'Pausar (Ocultar)' : 'Activar (Mostrar)'}
                        >
                          {prod.active ? <Eye className="w-3.5 h-3.5 text-green-600" /> : <EyeOff className="w-3.5 h-3.5 text-stone-400" />}
                        </button>
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setIsEditorOpen(true);
                          }}
                          className="p-1 text-stone-400 hover:text-[#1C1917]"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#8A6D3B]" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          className="p-1 text-stone-300 hover:text-red-600"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-serif-title text-sm font-bold text-[#1C1917] truncate">
                      {prod.name}
                    </h4>

                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {prod.description}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1C1917] font-serif">
                        ${prod.price?.toLocaleString('es-AR')}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prod.active ? 'bg-green-100 text-green-800' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {prod.active ? 'En Catálogo' : 'Pausado'}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 2: Orders Manager */}
        {activeTab === 'orders' && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            <div>
              <h3 className="font-serif-title text-xl font-bold text-[#1C1917]">
                Registro de Pedidos Recibidos
              </h3>
              <p className="text-xs text-stone-500">
                Pedidos generados desde la tienda PWA para seguimiento de estados y agenda
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-stone-600">Aún no hay pedidos registrados</p>
                <p className="text-xs text-stone-400 mt-1">Los pedidos completados desde la web aparecerán aquí.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#1C1917]">
                            #{order.id}
                          </span>
                          <span className="text-xs text-stone-400">•</span>
                          <span className="text-xs font-semibold text-[#8A6D3B]">
                            {order.customerName}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400">
                          {new Date(order.createdAt).toLocaleString('es-AR')}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 font-medium">Estado:</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-stone-300 bg-[#FAF7F2] text-[#1C1917]"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En preparación">En preparación</option>
                          <option value="Listo para entrega">Listo para entrega</option>
                          <option value="Entregado">Entregado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </div>
                    </div>

                    {/* Order details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
                      <div>
                        <span className="font-bold block text-[#1C1917] mb-1">Entrega & Fecha:</span>
                        <p>{order.deliveryType === 'delivery' ? '🛵 Envío a domicilio' : '🏬 Retiro en La Plata'}</p>
                        <p className="font-semibold text-[#8A6D3B]">📅 {order.deliveryDate} ({order.timeSlot})</p>
                        {order.address && <p className="text-[11px] text-stone-500 mt-1">📍 {order.address}</p>}
                      </div>

                      <div>
                        <span className="font-bold block text-[#1C1917] mb-1">Contacto & Pago:</span>
                        <a 
                          href={`https://wa.me/${order.customerPhone?.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-green-600 hover:underline font-semibold"
                        >
                          <Phone className="w-3 h-3" />
                          {order.customerPhone}
                        </a>
                        <p className="mt-1 uppercase text-[10px] font-bold text-stone-500">
                          💳 Pago: {order.paymentMethod}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold block text-[#1C1917] mb-1">Total del Pedido:</span>
                        <span className="text-base font-bold text-[#1C1917] font-serif">
                          ${order.total?.toLocaleString('es-AR')}
                        </span>
                        {order.deliveryFee > 0 && (
                          <span className="text-[10px] text-stone-400 block">
                            (Incluye envío ${order.deliveryFee?.toLocaleString('es-AR')})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Productos ({order.items?.length}):
                      </span>
                      <ul className="text-xs space-y-1">
                        {order.items?.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between text-stone-700">
                            <span>
                              {item.quantity}x <strong>{item.name}</strong>
                              {item.customNote && <span className="text-[#8A6D3B] italic ml-2">("{item.customNote}")</span>}
                            </span>
                            <span className="font-serif font-semibold">
                              ${(item.price * item.quantity).toLocaleString('es-AR')}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {order.generalNotes && (
                        <p className="text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200 italic">
                          Nota del cliente: "{order.generalNotes}"
                        </p>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Settings Manager */}
        {activeTab === 'settings' && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            
            <form onSubmit={handleSaveSettings} className="max-w-2xl space-y-6">
              <div>
                <h3 className="font-serif-title text-xl font-bold text-[#1C1917]">
                  Configuración del Negocio
                </h3>
                <p className="text-xs text-stone-500">
                  Ajustá tu número de WhatsApp para recibir pedidos, datos bancarios y tarifas de envío
                </p>
              </div>

              {saveSettingsToast && (
                <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>¡Ajustes guardados correctamente!</span>
                </div>
              )}

              <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B]">
                  Contacto & Recepción de Pedidos
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Número de WhatsApp (con código de país)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      placeholder="5492215551234"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-[#FAF7F2]"
                    />
                    <span className="text-[10px] text-stone-400 block mt-1">
                      Ej: 549221... (sin el + ni espacios)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Usuario de Instagram
                    </label>
                    <input
                      type="text"
                      value={settingsForm.instagramUser || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramUser: e.target.value })}
                      placeholder="evangeline.bakehouse"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Dirección de Retiro (Punto en La Plata)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.pickupAddress || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, pickupAddress: e.target.value })}
                    placeholder="Zona Centro / Plaza Paso, La Plata"
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-[#FAF7F2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Costo Base de Envío ($ ARS)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.deliveryCostBase || 2500}
                      onChange={(e) => setSettingsForm({ ...settingsForm, deliveryCostBase: Number(e.target.value) })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Horas Mínimas de Anticipación
                    </label>
                    <input
                      type="number"
                      value={settingsForm.minNoticeHours || 48}
                      onChange={(e) => setSettingsForm({ ...settingsForm, minNoticeHours: Number(e.target.value) })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

              </div>

              {/* Bank Settings */}
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B]">
                  Datos Bancarios para Transferencias / Señas
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Alias de Transferencia
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bankAlias || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankAlias: e.target.value })}
                      placeholder="EVANGELINE.PASTELERIA"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-[#FAF7F2] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Titular de la Cuenta
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bankHolder || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankHolder: e.target.value })}
                      placeholder="Melisa Leyes"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Aviso del Banner Superior
                  </label>
                  <input
                    type="text"
                    value={settingsForm.bannerNotice || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bannerNotice: e.target.value })}
                    placeholder="✨ Pedidos con 48hs de anticipación • Envíos en La Plata"
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-[#FAF7F2]"
                  />
                </div>

              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#1C1917] text-[#D4AF37] font-semibold text-xs rounded-xl hover:bg-[#292524] transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Configuración</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>

      {/* Product Editor Modal */}
      <ProductEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        categories={categories}
        onSaveSuccess={loadAllData}
      />

    </div>
  );
};
