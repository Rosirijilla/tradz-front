import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Principal.css";
import { FaInfoCircle, FaEye, FaBullseye } from 'react-icons/fa';

const Principal = () => {
  return (
    <div className="backgorund-principal">
      <div className="order-background">
        <div className="text-background">
          <h1>Bienvenida a Tradz :)</h1>
          <p>Acá podrás comprar y vender productos de forma fácil y rápida</p>
        </div>
        <div className="col d-flex flex-column justify-content-evenly align-items-center gap-3">
          <Link to='/login'>
            <button className="btn-principal" type="button">
                Iniciar Sesión
            </button>
          </Link>
          <Link to='/register'>
          <button className="btn-principal" type="button">
            Registrarse
          </button>
          </Link>
        </div>
      </div>
      <div className="about">
        <div className="about-divs">
          <FaInfoCircle size={40} className="mb-2 icon-about" />
          <h2>Sobre nosotros</h2>
          <p className="about-text">Somos un equipo que quiere generar un espacio para hacer compras de forma más <b>accesible y confiable para todos</b>. Creemos que un marketplace no tiene por qué ser complicado ni estar lleno de distracciones. Nuestra plataforma es simple, directa y pensada para que tanto compradores como vendedores tengan una <b>experiencia fluida y segura</b>.</p>
        </div>
        <div className="about-divs">
          <FaEye size={40} className="mb-2 icon-about" />
          <h2>Visión</h2>
          <p className="about-text">Queremos ser el marketplace líder en simplicidad y seguridad, donde <b>las compras y ventas sean rápidas</b> y confiables. Queremos ser un espacio donde los usuarios puedan encontrar lo que necesitan con <b>facilidad y confianza</b>.</p>
        </div>
        <div className="about-divs">
          <FaBullseye size={40} className="mb-2 icon-about" />
          <h2>Misión</h2>
          <p className="about-text">Nuestra misión es <b>simplificar la experiencia de compra y venta en línea</b>, ofreciendo un entorno seguro y fácil de usar. Queremos que cada usuario pueda encontrar rápidamente lo que busca, con <b>confianza y comodidad</b>.</p>
        </div>
      </div>
    </div>
  );
};

export default Principal;
