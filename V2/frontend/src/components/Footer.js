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
        <div className='social-media'>
            <a href='#' className='icons'> <img src={facebook} alt='facebook' ></img></a>
            <a href='#' className='icons'> <img src={tiktok} alt='tiktok'></img></a>
            <a href='#' className='icons'> <img src={twitter} alt='twitter' ></img></a>
            <a href='#' className='icons'> <img src={ig} alt='ig' ></img></a>
        </div>
        <p>Todos los derechos reservados &copy; {new Date().getFullYear()} Prowess</p>
      </div>
    </footer>
  );
}

export default Footer;
