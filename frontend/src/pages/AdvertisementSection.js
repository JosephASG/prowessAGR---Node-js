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
        src="https://media.discordapp.net/attachments/1157817962267426861/1204863847551344732/1.png?ex=65f1f766&is=65df8266&hm=5a3a0b82e9b657f70486c53a5eab43ea8de312e6648be4673e6b0b5200724b6c&=&format=webp&quality=lossless&width=587&height=587"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>
      <img
        src="https://media.discordapp.net/attachments/1157817962267426861/1204863847832223835/2.png?ex=65f1f766&is=65df8266&hm=7b6e0c9aabf8c3580bb4f39b83c60f9c2a7f54367e2820e2ce753d731caebf3e&=&format=webp&quality=lossless&width=587&height=587"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>      
      <img
        src="https://media.discordapp.net/attachments/1157817962267426861/1204863848151261194/3.png?ex=65f1f766&is=65df8266&hm=556c149d311c3967b8b91880645281abd0a497d0acf183072ad7459e7cd37972&=&format=webp&quality=lossless&width=587&height=587"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>
      <img
        src="https://media.discordapp.net/attachments/1157817962267426861/1204863848478281809/4.png?ex=65f1f766&is=65df8266&hm=6403080f772814d9d84fd50e60eee2ecca6211b5ec0ff4a2ae7963a9fdc4c144&=&format=webp&quality=lossless&width=587&height=587"
        alt="Imagen Planes"
        className="advertisement-image"
      /><br/><br/><br/>      
      </div>
    </center>
  );
}

export default AdvertisementSection;