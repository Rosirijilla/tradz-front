import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const getProductImage = (product) => {
  try {
    // Si el producto tiene imágenes en formato array
    if (Array.isArray(product.imagenes) && product.imagenes.length > 0) {
      return product.imagenes[0].replace(/\\/g, '/');
    }
    // Si el producto tiene una única imagen en formato string
    else if (typeof product.imagenes === 'string') {
      return product.imagenes.replace(/\\/g, '/');
    }
    // Si el producto tiene la imagen en otro formato (por ejemplo, imagen_url)
    else if (product.imagen_url) {
      return product.imagen_url.replace(/\\/g, '/');
    }
    // Imagen por defecto si no hay imagen disponible
    return '/ruta/a/imagen/por/defecto.jpg';
  } catch (error) {
    console.warn('Error al procesar imagen del producto:', product);
    return '/ruta/a/imagen/por/defecto.jpg';
  }
};

const SearchResults = ({ products }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {products.map((product) => (
        <Col key={product.id_producto}>
          <Card className="h-100 shadow-sm product-card">
            <Card.Img
              variant="top"
              src={getProductImage(product)}
              alt={product.nombre_producto}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>{product.nombre_producto}</Card.Title>
              <Card.Text className="text-muted">
                {product.descripcion?.substring(0, 100)}
                {product.descripcion?.length > 100 ? '...' : ''}
              </Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-bold text-primary">
                  ${product.precio?.toLocaleString('es-CL')}
                </span>
                <Link 
                  to={`/product/${product.id_producto}`} 
                  className="btn btn-outline-primary"
                >
                  Ver detalles
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SearchResults;
