import axios from 'axios';

// Definir la URL base de la API según el entorno
const API_URL = import.meta.env.VITE_API_URL || 'https://tradz.onrender.com/api';

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

// Variable para controlar si estamos refrescando el token
let isRefreshing = false;
// Cola de peticiones pendientes
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor de peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Interceptor - Token en localStorage:', token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en interceptor de petición:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error no es 401 o ya intentamos refrescar, rechazamos
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Si ya estamos refrescando, agregamos la petición a la cola
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      console.log('Intentando refrescar token...');
      const response = await api.post('/auth/refresh', { refreshToken });
      const { accessToken } = response.data;
      
      localStorage.setItem('token', accessToken);
      
      // Actualizar el token en la petición original y en las pendientes
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      processQueue(null, accessToken);
      
      console.log('Token refrescado exitosamente');
      return api(originalRequest);
    } catch (refreshError) {
      console.error('Error al refrescar token:', refreshError);
      processQueue(refreshError, null);
      
      // Limpiar tokens y redirigir al login
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// Servicios de autenticación
export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response?.data);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { accessToken, refreshToken, user } = response.data;
      
      // Guardar ambos tokens
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      console.log('Login exitoso:', { user });
      console.log('Access Token:', localStorage.getItem('token'));
      console.log('Refresh Token:', localStorage.getItem('refreshToken'));
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
  
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo perfil:', {
        mensaje: error.message,
        respuesta: error.response?.data,
        estado: error.response?.status
      });
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', { refreshToken });
      const { accessToken } = response.data;
      
      localStorage.setItem('token', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Si falla el refresh, limpiamos los tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  },

  hasValidToken: () => {
    return !!localStorage.getItem('token');
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error actualizando perfil:', {
        mensaje: error.message,
        respuesta: error.response?.data,
        estado: error.response?.status,
        datos: userData
      });
      throw error;
    }
  },
};

// Servicios de productos
export const productService = {
  getAllProducts: async () => {
    try {
      console.log('Solicitando productos del usuario...');
      const response = await api.get('/productos/user/products');
      console.log('Respuesta completa:', response);
      
      // Asegurarnos de que los datos tienen el formato correcto
      const productos = response.data.data.map(producto => ({
        id: producto.id_producto,
        nombre: producto.nombre_producto,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        categoria: producto.categoria,
        imagenes: Array.isArray(producto.imagenes) ? producto.imagenes : [],
        estado: producto.estado
      }));

      console.log('Productos procesados:', productos);
      return productos;
    } catch (error) {
      console.error('Error en getAllProducts:', error);
      throw error;
    }
  },

  getPublicProducts: async () => {
    try {
      const response = await api.get('/productos');
      return response.data.data || [];
    } catch (error) {
      console.error('Error obteniendo productos públicos:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      console.log('Solicitando producto con ID:', id);
      const response = await api.get(`/productos/${id}`);
      
      // Asegurarnos de que los datos tienen el formato correcto
      const producto = response.data.data;
      return {
        id: producto.id_producto,
        nombre_producto: producto.nombre_producto,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        categoria: producto.categoria,
        imagenes: Array.isArray(producto.imagenes) ? producto.imagenes : [producto.imagenes],
        estado: producto.estado
      };
    } catch (error) {
      console.error('Error en getProductById:', error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post('/productos', productData);
      return response.data.data;
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      console.log('Enviando petición de actualización:', {
        url: `/productos/${productId}`,
        datos: productData
      });

      const response = await api.put(`/productos/${productId}`, productData);
      console.log('Respuesta de actualización:', response.data);

      // Asegurarnos de que los datos tienen el formato correcto
      const productoActualizado = {
        id: response.data.data.id_producto,
        nombre: response.data.data.nombre_producto,
        descripcion: response.data.data.descripcion,
        precio: response.data.data.precio,
        stock: response.data.data.stock,
        categoria: response.data.data.categoria,
        imagenes: Array.isArray(response.data.data.imagenes) ? response.data.data.imagenes : [],
        estado: response.data.data.estado
      };

      return productoActualizado;
    } catch (error) {
      console.error('Error detallado en updateProduct:', {
        mensaje: error.message,
        respuesta: error.response?.data,
        estado: error.response?.status,
        datos: productData
      });
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      await api.delete(`/productos/${productId}`);
    } catch (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    const response = await api.get(`/productos/categoria/${category}`);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await api.get(`/productos/search?q=${query}`);
    return response.data;
  },
};

// Servicios del carrito
export const cartService = {
  getCart: async () => {
    try {
      console.log('Intentando obtener el carrito...');
      const response = await api.get('/cart');
      console.log('Respuesta del carrito:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error detallado al obtener el carrito:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.config?.headers
      });
      throw error;
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      console.log('Intentando agregar al carrito:', {
        productId,
        quantity,
        token: localStorage.getItem('token'),
        headers: api.defaults.headers
      });

      const response = await api.post('/cart', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Error detallado al agregar al carrito:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.config?.headers
      });
      throw error;
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      console.log('Enviando actualización de cantidad:', { 
        productId, 
        quantity,
        url: `/cart/${productId}`,
        token: localStorage.getItem('token')
      });

      const response = await api.put(`/cart/${productId}`, { 
        quantity  // Usar 'quantity' en lugar de 'cantidad'
      });
      
      console.log('Respuesta de actualización:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error detallado al actualizar cantidad:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.config?.headers,
        requestData: { productId, quantity }
      });
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      return true;
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      await api.delete('/cart');
      return true;
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
      throw error;
    }
  },

  checkout: async (cartData) => {
    try {
      const response = await api.post('/checkouts', cartData);
      return response.data;
    } catch (error) {
      console.error('Error al procesar el checkout:', error);
      throw error;
    }
  }
};

// Servicios de descuentos
export const discountService = {
  getDiscountCodes: async () => {
    try {
      const response = await api.get('/discounts');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los códigos de descuento:', error);
      throw new Error('No se pudieron obtener los códigos de descuento.');
    }
  },

  validateDiscountCode: async (code) => {
    try {
      const response = await api.get(`/discounts/validate/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error al validar el código de descuento:', error);
      throw new Error('Código de descuento inválido o expirado.');
    }
  },

  saveDiscountCode: async (discountData) => {
    try {
      const response = await api.post('/discounts/save', discountData);
      return response.data;
    } catch (error) {
      console.error('Error al guardar el código de descuento en API:', error);
      throw new Error('No se pudo guardar el código de descuento.');
    }
  },
};


// Servicios de resumen de compra
export const purchaseService = {
  getSummary: async () => {
    try {
      const response = await api.get('/purchase/summary');
      return response.data;
    } catch (error) {
      console.error('Error al obtener el resumen de compra:', error);
      throw error;
    }
  },
  
  applyDiscount: async (discountCode) => {
    try {
      const response = await api.post('/discounts/apply', { code: discountCode });
      return response.data;
    } catch (error) {
      console.error('Error al aplicar el código de descuento:', error);
      throw error;
    }
  }
};

// Exportar la instancia de api individualmente
export default api;

// Exportar todos los servicios agrupados
export const services = {
  auth: authService,
  products: productService,
  cart: cartService,
  discounts: discountService,
  purchase: purchaseService,
};

console.log('¿Tiene token válido?:', authService.hasValidToken());
