// AdvertisementSection.js

import React from 'react';
import "./AdvertisementSection.css"; // Puedes crear un archivo de estilo para esta sección si es necesario
import Planes from '../imagenes/Planes.png';

function AdvertisementSection() {
  return (
    
    <center>
      <h1>PROWESS PLANES</h1>
      <div className="p">
        <p>Descubre la Excelencia en Agricultura con Prowess Agrícola</p>
        <p>¡Aumenta la productividad y optimiza tus cultivos con nuestras soluciones avanzadas!</p>
      </div>
      <div className="advertisement-section">
        <img src={Planes} alt="Imagen Planes" className="advertisement-image" />
      </div>
    </center>
  );
}

export default AdvertisementSection;