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
      <img
        src="https://media.discordapp.net/attachments/819309536414400533/1199063611994284122/Planes.png?ex=65c12e02&is=65aeb902&hm=93ea8d1f80159ef1a3ad0de3d41c1f52bda799b7229186cf088b5856913d4b9b&=&format=webp&quality=lossless&width=1080&height=1080"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>
      <img
        src="https://media.discordapp.net/attachments/819309536414400533/1199063612283687063/Planes1.png?ex=65c12e02&is=65aeb902&hm=e0c0bb3b3bf5f76a9269842da761dd32be8c5d39d7456273133b75142cfffaf7&=&format=webp&quality=lossless&width=1080&height=1080"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>      
      <img
        src="https://media.discordapp.net/attachments/819309536414400533/1199063612661178438/Planes2.png?ex=65c12e02&is=65aeb902&hm=1367364a85a26bda3e26d85ebc311d075807804502e3e5e080645b9ea1153c15&=&format=webp&quality=lossless&width=1080&height=1080"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>
      <img
        src="https://media.discordapp.net/attachments/819309536414400533/1199063611633565716/Planes3.png?ex=65c12e02&is=65aeb902&hm=464bbb3103b71389468287f19c7330df4c232779ebcc18c838f32404f7133c9f&=&format=webp&quality=lossless&width=1080&height=1080"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>      
      </div>
    </center>
  );
}

export default AdvertisementSection;