import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { cartService } from "../services/api";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(UserContext);

// Función auxiliar para manejar errores
  const handleError = (error, customMessage) => {
    const errorMessage = error.response?.data?.error || customMessage;
    setError(errorMessage);
    alert(errorMessage);
  };

  // Cargar carrito
  const fetchCart = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      handleError(error, 'Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  };

  // Agregar al carrito
  const handleAddToCart = async (product) => {
    if (!token) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    setLoading(true);
    try {
      console.log(product);
      const result = await cartService.addToCart(product.id_producto, 1);
      setCart([...cart, result]);
      alert('Producto agregado al carrito exitosamente');
    } catch (error) {
      handleError(error, 'Error al agregar al carrito');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cantidad
  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      return handleRemove(productId);
    }

    setLoading(true);
    try {
      const result = await cartService.updateQuantity(productId, newQuantity);
      setCart(cart.map(item => 
        item.product_id === productId ? result : item
      ));
    } catch (error) {
      handleError(error, 'Error al actualizar cantidad');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar del carrito
  const handleRemove = async (productId) => {
    setLoading(true);
    try {
      await cartService.removeFromCart(productId);
      setCart(cart.filter(item => item.product_id !== productId));
    } catch (error) {
      handleError(error, 'Error al eliminar producto');
    } finally {
      setLoading(false);
    }
  };

  // Efectos
  useEffect(() => {
    fetchCart();
  }, [token]);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  return {
    cart,
    total,
    loading,
    error,
    handleAddToCart,
    handleQuantityChange,
    handleRemove,
    clearCart: async () => {
      try {
        await cartService.clearCart();
        setCart([]);
      } catch (error) {
        handleError(error, 'Error al limpiar el carrito');
      }
    }
  };
};

export default useCart;