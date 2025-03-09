import React from "react";
import "../styles/Carousel.css";

const Carousel = () => {
  // Array estático de imágenes para el carrusel
  const carouselImages = [
    {
      id: 1,
      url: "https://res.cloudinary.com/dvhwvtykz/image/upload/v1741231510/tradz1_rv3yyl.webp",
      alt: "Descuento por 3 días"
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dvhwvtykz/image/upload/v1741231510/tradz2_vmfcfv.webp",
      alt: "Black Friday"
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dvhwvtykz/image/upload/v1741231512/tradz4_jpvgko.webp",
      alt: "Felices Pascuas"
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dvhwvtykz/image/upload/v1741231511/tradz3_xdkx8c.webp",
      alt: "Ventas de Halloween"
    }
  ];

  return (
    <div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner carousel-image">
          {carouselImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={image.url}
                className="img-fluid"
                alt={image.alt}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-slide="prev"
          data-bs-target="#carouselExampleAutoplaying"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-slide="next"
          data-bs-target="#carouselExampleAutoplaying"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
