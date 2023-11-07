import React from 'react';
import './Footer.css';
import facebook from '../imagenes/facebook.png';
import tiktok from '../imagenes/tiktok.png';
import twitter from '../imagenes/twitter.png';
import ig from '../imagenes/ig.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Aquí puedes agregar el contenido que desees para el footer */}
 
        <p>Todos los derechos reservados &copy; {new Date().getFullYear()} Prowess</p>
        <p>Revisa nuestros <a href='terms&conditions'>Términos y Condiciones</a></p>
      </div>
    </footer>
  );
}

export default Footer;
