import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { storage } from './services/storage';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomCakesSection } from './components/CustomCakesSection';
import { Footer } from './components/Footer';

import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';

function MainApp() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({});
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const refreshData = () => {
    setProducts(storage.getProducts());
    setCategories(storage.getCategories());
    setSettings(storage.getSettings());
  };

  useEffect(() => {
    refreshData();

    const handleProductsUpdated = () => setProducts(storage.getProducts());
    const handleCategoriesUpdated = () => setCategories(storage.getCategories());
    const handleSettingsUpdated = () => setSettings(storage.getSettings());

    window.addEventListener('evangeline_products_updated', handleProductsUpdated);
    window.addEventListener('evangeline_categories_updated', handleCategoriesUpdated);
    window.addEventListener('evangeline_settings_updated', handleSettingsUpdated);

    return () => {
      window.removeEventListener('evangeline_products_updated', handleProductsUpdated);
      window.removeEventListener('evangeline_categories_updated', handleCategoriesUpdated);
      window.removeEventListener('evangeline_settings_updated', handleSettingsUpdated);
    };
  }, []);

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917]">
      {/* Navigation */}
      <Navbar settings={settings} onOpenAdmin={handleOpenAdmin} />

      {/* Main Content Flow */}
      <main className="flex-1">
        <Hero settings={settings} />
        <ProductGrid products={products} categories={categories} />
        <CustomCakesSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer settings={settings} onOpenAdmin={handleOpenAdmin} />

      {/* Modals and Drawers */}
      <ProductModal />
      <CartDrawer settings={settings} />
      <CheckoutModal settings={settings} />

      {/* Admin Experience */}
      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
          if (localStorage.getItem('evangeline_admin_logged') === 'true') {
            setIsAdminDashboardOpen(true);
          }
        }}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
