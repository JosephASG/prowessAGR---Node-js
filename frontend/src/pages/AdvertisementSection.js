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
        src="https://media.discordapp.net/attachments/1157817962267426861/1204863847551344732/1.png?ex=65d647e6&is=65c3d2e6&hm=01b5b58c34341eaa542695f85b22261459fbf2826fed793c3aad8b50585fd58d&=&format=webp&quality=lossless&width=670&height=670"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>
      <img
        src="https://media.discordapp.net/attachments/1157817962267426861/1204863847832223835/2.png?ex=65d647e6&is=65c3d2e6&hm=aba7a0d5dfd2cfca772527400a2c66340ad0e47b9a5acf10ce0e814204816ae5&=&format=webp&quality=lossless&width=670&height=670"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>      
      <img
        src="https://media.discordapp.net/attachments/1157817962267426861/1204863848151261194/3.png?ex=65d647e6&is=65c3d2e6&hm=9bf2de6057bc9e997464af432ba55bb236558813cffc1f2f5f60ea8e780f1462&=&format=webp&quality=lossless&width=670&height=670"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>
      <img
        src="https://media.discordapp.net/attachments/1157817962267426861/1204863848478281809/4.png?ex=65d647e6&is=65c3d2e6&hm=841a268d2add34027c5b2e45078aed63ceaf9109b751cb1b670f5c786648a315&=&format=webp&quality=lossless&width=670&height=670"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>      
      </div>
    </center>
  );
}

export default AdvertisementSection;