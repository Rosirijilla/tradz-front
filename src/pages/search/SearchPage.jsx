import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { productService } from '../../services/api';
import SearchResults from './SearchResults';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchTerm = searchParams.get('q');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm) return;

      try {
        setLoading(true);
        setError(null);
        const response = await productService.searchProducts(searchTerm);
        console.log('Resultados de búsqueda:', response);
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error en búsqueda:', error);
        setError('No pudimos realizar la búsqueda. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <Container className="py-4">
      {!searchTerm ? (
        <Alert variant="info">
          Utiliza la barra de búsqueda para encontrar productos
        </Alert>
      ) : (
        <>
          <div className="d-flex align-items-baseline mb-4">
            <h2 className="mb-0">"{searchTerm}"</h2>
            {!loading && (
              <span className="text-muted ms-3">
                {products.length} {products.length === 1 ? 'resultado' : 'resultados'}
              </span>
            )}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : products.length === 0 ? (
            <Alert variant="info">
              No encontramos productos que coincidan con "{searchTerm}"
            </Alert>
          ) : (
            <SearchResults products={products} />
          )}
        </>
      )}
    </Container>
  );
};

export default SearchPage;
