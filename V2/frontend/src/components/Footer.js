import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Aquí puedes agregar el contenido que desees para el footer */}
        <p>Todos los derechos reservados &copy; {new Date().getFullYear()} Mi Empresa</p>
      </div>
    </footer>
  );
}

export default Footer;
