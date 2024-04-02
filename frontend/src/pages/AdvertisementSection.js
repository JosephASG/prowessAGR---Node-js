import React from 'react';
import "./AdvertisementSection.css";

function AdvertisementSection() {
  return (
    <center>
      <h1>PROWESS PLANES</h1>
      <div className="p">
        <p>Descubre la Excelencia en Agricultura con Prowess Agrícola</p>
        <p>¡Aumenta la productividad y optimiza tus cultivos con nuestras soluciones avanzadas!</p>
      </div>
      <div className="advertisement-section">
        <div className="image-pair">
          <img
            src="https://prowessec.com/wp-content/uploads/2024/02/1.png"
            alt="Imagen Planes"
            className="advertisement-image"
          />
          <img
            src="https://prowessec.com/wp-content/uploads/2024/02/2.png"
            alt="Imagen Planes"
            className="advertisement-image"
          />
        </div>
        <div className="image-pair">
          <img
            src="https://prowessec.com/wp-content/uploads/2024/02/3.png"
            alt="Imagen Planes"
            className="advertisement-image"
          />
          <img
            src="https://prowessec.com/wp-content/uploads/2024/02/4.png"
            alt="Imagen Planes"
            className="advertisement-image"
          />
        </div>
      </div>
    </center>
  );
}

export default AdvertisementSection;
