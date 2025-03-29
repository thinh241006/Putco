const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 5300;
const CLIENT_PORT = import.meta.env.VITE_CLIENT_PORT || 5173;
const CLIENT_PORT_ALT = import.meta.env.VITE_CLIENT_PORT_ALT || 5174;

export const API_BASE_URL = `http://localhost:${SERVER_PORT}/api`;

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    checkAuth: `${API_BASE_URL}/auth/check-auth`,
  },
  admin: {
    products: {
      uploadImage: `${API_BASE_URL}/admin/products/upload-image`,
      add: `${API_BASE_URL}/admin/products/add`,
      edit: (id) => `${API_BASE_URL}/admin/products/edit/${id}`,
      delete: (id) => `${API_BASE_URL}/admin/products/delete/${id}`,
      getAll: `${API_BASE_URL}/admin/products/get`,
    },
    orders: {
      get: `${API_BASE_URL}/admin/orders/get`,
      details: (id) => `${API_BASE_URL}/admin/orders/details/${id}`,
      update: (id) => `${API_BASE_URL}/admin/orders/update/${id}`,
    },
  },
  shop: {
    products: {
      base: `${API_BASE_URL}/shop/products/get`,
      details: (id) => `${API_BASE_URL}/shop/products/get/${id}`,
      filtered: `${API_BASE_URL}/shop/products/get`,
    },
    cart: {
      add: `${API_BASE_URL}/shop/cart/add`,
      get: (userId) => `${API_BASE_URL}/shop/cart/get/${userId}`,
      update: `${API_BASE_URL}/shop/cart/update-cart`,
      delete: (userId, productId) => `${API_BASE_URL}/shop/cart/${userId}/${productId}`,
    },
    address: {
      add: `${API_BASE_URL}/shop/address/add`,
      get: (userId) => `${API_BASE_URL}/shop/address/get/${userId}`,
      update: (userId, addressId) => `${API_BASE_URL}/shop/address/update/${userId}/${addressId}`,
      delete: (userId, addressId) => `${API_BASE_URL}/shop/address/delete/${userId}/${addressId}`,
    },
    order: {
      create: `${API_BASE_URL}/shop/order/create`,
      capture: `${API_BASE_URL}/shop/order/capture`,
      list: (userId) => `${API_BASE_URL}/shop/order/list/${userId}`,
      details: (id) => `${API_BASE_URL}/shop/order/details/${id}`,
    },
    search: (keyword) => `${API_BASE_URL}/shop/search/${keyword}`,
    review: {
      add: `${API_BASE_URL}/shop/review/add`,
      get: (productId) => `${API_BASE_URL}/shop/review/get/${productId}`,
    },
  },
  common: {
    feature: {
      get: `${API_BASE_URL}/common/feature/get`,
      add: `${API_BASE_URL}/common/feature/add`,
    },
  },
};

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; 