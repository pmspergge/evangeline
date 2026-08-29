import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'evangeline_products_v1',
  CATEGORIES: 'evangeline_categories_v1',
  ORDERS: 'evangeline_orders_v1',
  SETTINGS: 'evangeline_settings_v1',
  AUTH: 'evangeline_auth_session',
};

export const storage = {
  // PRODUCTS
  getProducts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading products from storage', e);
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts: (products) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      window.dispatchEvent(new Event('evangeline_products_updated'));
    } catch (e) {
      console.error('Error saving products', e);
    }
  },

  addProduct: (product) => {
    const products = storage.getProducts();
    const newProduct = {
      ...product,
      id: 'prod-' + Date.now(),
      active: true,
    };
    products.unshift(newProduct);
    storage.saveProducts(products);
    return newProduct;
  },

  updateProduct: (id, updatedFields) => {
    const products = storage.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      storage.saveProducts(products);
      return products[index];
    }
    return null;
  },

  deleteProduct: (id) => {
    const products = storage.getProducts().filter((p) => p.id !== id);
    storage.saveProducts(products);
  },

  // CATEGORIES
  getCategories: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_CATEGORIES;
    }
  },

  saveCategories: (categories) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      window.dispatchEvent(new Event('evangeline_categories_updated'));
    } catch (e) {
      console.error('Error saving categories', e);
    }
  },

  // SETTINGS
  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        return INITIAL_SETTINGS;
      }
      return { ...INITIAL_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      return INITIAL_SETTINGS;
    }
  },

  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      window.dispatchEvent(new Event('evangeline_settings_updated'));
    } catch (e) {
      console.error('Error saving settings', e);
    }
  },

  // ORDERS
  getOrders: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  createOrder: (orderData) => {
    const orders = storage.getOrders();
    const newOrder = {
      ...orderData,
      id: 'EVG-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Pendiente', // Pendiente, En preparación, Listo, Entregado, Cancelado
    };
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new Event('evangeline_orders_updated'));
    return newOrder;
  },

  updateOrderStatus: (orderId, status) => {
    const orders = storage.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      window.dispatchEvent(new Event('evangeline_orders_updated'));
      return orders[index];
    }
    return null;
  },
};
