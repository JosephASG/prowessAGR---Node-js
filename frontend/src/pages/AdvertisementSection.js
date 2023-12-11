// AdvertisementSection.js

import React from 'react';
import "./AdvertisementSection.css"; // Puedes crear un archivo de estilo para esta sección si es necesario
import Anuncio from '../imagenes/Anuncio.png';

function AdvertisementSection() {
  return (
    
      <center>
      <h1>ANUNCIOS</h1>
      <div className="advertisement-section">
      <p>¡DESCUBRE EL PODER DEL EXITO CON PROWESS!</p>
      <p>OFRECEMOS</p>
      <p>PLANES MENSUALES</p>
      <img src={Anuncio} alt="Imagen Anuncio" className="advertisement-image" /><br/>
    </div>
    <h1>ADVANCE PROWESS</h1>
    <div className="advertisement-section">
      <p>- GESTION DE REDES SOCIALES</p>
      <p>- REDISEÑO DE CATALOGO Y CREACION DE MENU ONLINE (CODIGO QR)</p>
      <p>- CRONOGRAMA DE CONTENIDO</p>
      <p>. 4 tiktoks al mes - trafico de tik tok a Instagram (mencion)</p>
      <p>. 2 pasts + 2 carruseles al mes en Instagram y Facebook</p>
      <p>- VISUALIZACION EN PLATAFORMAS DE VENTA INSTAGRAM</p>
      <p>- PUBLICIDAD DE FACEBOOK (CONTRATADA)</p>
      <p>- INCREMENTO DE SEGUIDORES EN REDES SOCIALES (80 - 100) MENSUALES</p><br/>
      <h2>PRECIO:</h2>
      <p>$34,99 + IVA</p>
    </div>
    <h1>SILVER PROWESS</h1>
    <div className="advertisement-section">
      <p>- GESTION DE REDES SOCIALES</p>
      <p>- REDISEÑO DE CATALOGOS Y/O MENUS</p>
      <p>- CRONOGRAMA DE CONTENIDO</p>
      <p>. 4 post + 1 carrucel al mes para Facebook e Instagram (mencion)</p>
      <p>. 6 tiktoks al mes</p>
      <p>- INCREMENTO DE SEGUIDORES 100-120</p>
      <p>- PUBLICIDAD DE FACEBOOK ( CONTRATADA )</p>
      <p>- AUMENTO DE VISUALIZACION</p><br/>
      <h2>PRECIO:</h2>
      <p>$49,99 + IVA</p>
    </div>
    <h1>GOLD PROWESS</h1>
    <div className="advertisement-section">
      <h2></h2>
    </div>
    <h1>PLATINO PROWESS</h1>
    <div className="advertisement-section">
      <h2></h2>
    </div>
    </center>
  );
}

export default AdvertisementSection;