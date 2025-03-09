import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const EditProduct = ({ producto, handleUpdateProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre_producto: producto.nombre || '',
    descripcion: producto.descripcion || '',
    precio: producto.precio || 0,
    stock: producto.stock || 0,
    categoria: producto.categoria || '',
    imagenes: producto.imagen || ''
  });

  const categorias = [
    'Electrónica',
    'Ropa',
    'Hogar',
    'Deportes',
    'Juguetes',
    'Otros'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log de los datos que estamos enviando
      console.log('Datos a actualizar:', {
        id: producto.id_producto || producto.id,
        formData
      });

      // Convertir los datos al formato correcto
      const productoData = {
        nombre_producto: formData.nombre_producto,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        categoria: formData.categoria,
        imagenes: formData.imagenes ? [formData.imagenes] : [],
        estado: producto.estado || 'disponible'
      };

      console.log('Datos formateados para enviar:', productoData);
      await handleUpdateProduct(producto.id_producto || producto.id, productoData);
    } catch (error) {
      console.error('Error en handleSubmit de EditProduct:', error);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Editar Producto</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre_producto"
                    value={formData.nombre_producto}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="url"
                name="imagenes"
                value={formData.imagenes}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
              <Button 
                variant="outline-secondary" 
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                type="submit"
              >
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProduct;