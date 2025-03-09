import React, { useState, useEffect } from 'react';
import { productService } from '../../services/api';
import ProductGrid from './ProductGrid';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import { Button } from 'react-bootstrap';

const Feed = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Iniciando fetchProducts...');
      const data = await productService.getAllProducts();
      console.log('Datos recibidos de getAllProducts:', data);
      
      // Verificar la estructura de los datos
      if (Array.isArray(data)) {
        console.log('IDs de productos:', data.map(p => p.id_producto || p.id));
        setProductos(data);
      } else {
        console.log('Datos no son un array:', data);
        setProductos([]);
      }
    } catch (error) {
      console.error('Error detallado en fetchProducts:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError('Error al cargar los productos. Por favor, intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await productService.deleteProduct(productId);
        setProductos(productos.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error al eliminar:', error);
        setError('Error al eliminar el producto');
      }
    }
  };

  const handleEdit = (productId) => {
    const productoAEditar = productos.find(p => p.id === productId);
    setEditingProduct(productoAEditar);
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      console.log('Intentando actualizar producto:', {
        id: productId,
        datos: updatedData
      });

      const updatedProduct = await productService.updateProduct(productId, updatedData);
      console.log('Respuesta del servidor:', updatedProduct);

      setProductos(productos.map(p => 
        p.id_producto === productId || p.id === productId ? updatedProduct : p
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error detallado al actualizar:', {
        mensaje: error.message,
        respuesta: error.response?.data,
        estado: error.response?.status,
        datos: updatedData
      });
      setError('Error al actualizar el producto');
    }
  };

  const handleAddProduct = async (newProductData) => {
    try {
      const createdProduct = await productService.createProduct(newProductData);
      setProductos([...productos, createdProduct]);
      setIsAddingProduct(false);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      setError('Error al crear el producto');
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Productos</h2>
        <Button 
          variant="primary" 
          onClick={() => setIsAddingProduct(true)}
        >
          Agregar Producto
        </Button>
      </div>

      {isAddingProduct ? (
        <AddProduct
          handleAddProduct={handleAddProduct}
          onCancel={() => setIsAddingProduct(false)}
        />
      ) : editingProduct ? (
        <EditProduct
          producto={editingProduct}
          handleUpdateProduct={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <ProductGrid 
          productos={productos}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Feed;