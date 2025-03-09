import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import data from "../data/db.json";
import "../styles/cart.css";
import PurchaseSummary from "./PurchaseSummary";
import { cartService } from '../services/api';

const Cart = () => {
  const {
    cart,
    total,
    handleIncrease,
    handleDecrease,
    handleRemove,
    handleClearCart,
    handleCheckout,
  } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCart = async () => {
    try {
      console.log('Iniciando carga del carrito...');
      const data = await cartService.getCart();
      console.log('Datos del carrito recibidos:', data);
      setCartItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []); // Cargar al montar el componente

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      console.log('Actualizando cantidad:', { productId, newQuantity });
      if (newQuantity < 1) return;
      
      await cartService.updateQuantity(productId, newQuantity);
      await loadCart(); // Recargar el carrito después de actualizar
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      alert('Error al actualizar la cantidad');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      console.log('Eliminando producto:', productId);
      await cartService.removeFromCart(productId);
      await loadCart(); // Recargar el carrito después de eliminar
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      alert('Error al eliminar el producto');
    }
  };

  if (loading) return <div className="text-center mt-4">Cargando carrito...</div>;
  if (error) return <div className="text-center mt-4 text-danger">Error: {error}</div>;

  return (
    <div className="container">
      <h2 className="text-center mb-4">Tu Carrito</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems && cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div key={item.id_carrito_producto} className="card mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <img 
                          src={item.imagenes ? item.imagenes[0] : 'placeholder.jpg'} 
                          alt={item.nombre_producto} 
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-4 px-3">
                        <h5>{item.nombre_producto}</h5>
                        <p className="text-muted">Precio: ${item.precio_unitario.toLocaleString()}</p>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex align-items-center justify-content-center">
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleUpdateQuantity(item.id_producto, item.cantidad - 1)}
                            disabled={item.cantidad <= 1}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.cantidad}</span>
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleUpdateQuantity(item.id_producto, item.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <p className="mb-0 text-end">
                          ${(item.cantidad * item.precio_unitario).toLocaleString()}
                        </p>
                      </div>
                      <div className="col-md-1">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRemoveFromCart(item.id_producto)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-5">
              <h4>El carrito está vacío</h4>
              <p>¡Agrega algunos productos para comenzar!</p>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <PurchaseSummary cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
