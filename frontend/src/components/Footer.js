import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <p>Todos los derechos reservados &copy; {new Date().getFullYear()} Prowess</p>
        <p>Revisa nuestros <a href='terms&conditions'>Términos y Condiciones</a></p>
      </div>
    </footer>
  );
}

export default Footer;
