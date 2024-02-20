import React from 'react';
import './Footer.css';
import facebook from '../imagenes/facebook.png';
import instagram from '../imagenes/ig.png';
import mundo from '../imagenes/mundo.png';
import tiktok from '../imagenes/tiktok.png';
import whatsapp from '../imagenes/whatsapp.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-title">
      <p>¡Visita nuestras redes sociales para más información! </p>
      </div>
      <div className="footer-content">
        <a href="https://www.facebook.com/profile.php?id=100094846861007&mibextid=gik2fB" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebook" />
          <p>Facebook</p>
        </a>
        <a href="https://instagram.com/prowessec7?igshid=NGVhN2U2NjQ0Yg==" target="_blank" rel="noopener noreferrer">
          <img src={instagram} alt="Instagram" />
          <p>Instagram</p>
        </a>
        <a href="https://prowessec.com" target="_blank" rel="noopener noreferrer">
          <img src={mundo} alt="Mundo" />
          <p>ProwessEc</p>
        </a>
        <a href="https://www.tiktok.com/@prowess.ec?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
          <img src={tiktok} alt="Tiktok" />
          <p>TikTok</p>
        </a>
        <a href="https://api.whatsapp.com/send?phone=593992847677" target="_blank" rel="noopener noreferrer">
          <img src={whatsapp} alt="Whatsapp" />
          <p>WhatsApp</p>
        </a>
      </div>
      <div className="footer-contactos">
   <p>
    <strong>Nombre del Director: </strong>{" "}
    <a href="https://api.whatsapp.com/send?phone=0998160293" target="_blank" rel="noopener noreferrer">Dr. Luis Simbaña Taipe</a>
   </p>
   <p>
    <strong>Correo Electrónico:</strong>{" "}
    <a href="mailto:lesimbania@espe.edu.ec">lesimbania@espe.edu.ec</a>
   </p>
  </div>
      <div className="footer-info">
         <div className="footer-derechos">
          <p>Todos los derechos reservados - Prowess Ecuador &copy; {new Date().getFullYear()} | Revisa nuestros <a href='terms&conditions'>Términos y Condiciones</a></p>
          </div>
       </div>
    </footer>
  );
}

export default Footer;