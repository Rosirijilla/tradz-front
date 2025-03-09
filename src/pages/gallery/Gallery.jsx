import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../../components/Card'
import { productService } from '../../services/api';

const Gallery = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getPublicProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryTitle = () => {
    if (!categoryName) return 'Todos los productos';
    
    const titles = {
      'electronica': 'Productos de Electrónica',
      'ropa': 'Productos de Ropa',
      'hogar': 'Productos para el Hogar',
      'deportes': 'Artículos Deportivos',
      'juguetes': 'Juguetes',
      'otros': 'Otros Productos'
    };
    
    return titles[categoryName] || 'Todos los productos';
  };

  const filteredProducts = categoryName && products.length > 0
    ? products.filter(product => product.categoria && product.categoria.toLowerCase() === categoryName)
    : products;

  if (loading) {
    return <p className="text-center mt-5">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  return (
    <div>
      <h1 className='ms-5 mt-5'>{getCategoryTitle()}</h1>
      {filteredProducts.length > 0 ? (
        <Card products={filteredProducts} />
      ) : (
        <p className="text-center">No hay productos en esta categoría</p>
      )}
    </div>
  )
}

export default Gallery