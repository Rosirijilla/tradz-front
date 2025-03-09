import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import "../styles/Card.css";

const Card = ({ products }) => {
  const { handleAddToCart } = useContext(CartContext);
  const { profile, token } = useContext(UserContext);

  const handleAdd = (product) => {
    console.log("Token actual:", token);
    console.log("Perfil actual:", profile);
    console.log("Producto a agregar:", product);
    handleAddToCart(product);
  };

  return (
    <div>
      <div className='container-fluid justify-content-evenly row lexend_font'>
        {products.map((product) => (
          <div key={product.id_producto} className="card col-md-3 p-0 m-3" style={{ width: "18rem" }}>
            <div className="containerCartaImagen">
              <img src={product.imagenes} className="card-img-top" alt={product.nombre_producto} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.nombre_producto}</h5>
              {/* <p className="text-center">{product.descripcion}</p> */}
              <p className="card-text text-center"><strong>Precio: ${product.precio}</strong></p>
              <div className="d-flex justify-content-evenly">
                <Link to={`/post-details/${product.id_producto}`}><button className="btn btn-dark">
                  Ver más
                </button></Link>
                <button className="btn btn-dark" onClick={() => handleAdd(product)}>Añadir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
