// AdvertisementSection.js

import React from 'react';
import "./AdvertisementSection.css"; // Puedes crear un archivo de estilo para esta sección si es necesario

function AdvertisementSection() {
  return (
    <center>
      <h1>PROWESS PLANES</h1>
      <div className="p">
        <p>Descubre la Excelencia en Agricultura con Prowess Agrícola</p>
        <p>¡Aumenta la productividad y optimiza tus cultivos con nuestras soluciones avanzadas!</p>
      </div>
      <div className="advertisement-section">
        <img src={require('../imagenes/Planes.png').default} alt="Imagen Planes" className="advertisement-image" /><br/><br/><br/>
        <img src={require('../imagenes/Planes1.png').default} alt="Imagen Planes" className="advertisement-image" /><br/><br/><br/>
        <img src={require('../imagenes/Planes2.png').default} alt="Imagen Planes" className="advertisement-image" /><br/><br/><br/>
        <img src={require('../imagenes/Planes3.png').default} alt="Imagen Planes" className="advertisement-image" />
      </div>
    </center>
  );
}

export default AdvertisementSection;
