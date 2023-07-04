import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../imagenes/prowess-logo1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navigation-bar">
      <div className="navigation-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <button className={`hamburger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className={`navigation-list ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/tienda" onClick={toggleMenu}>
              Tienda
            </Link>
          </li>
          <li>
            <Link to="/vendedores" onClick={toggleMenu}>
              Vendedores
            </Link>
          </li>
          <li>
            <Link to="/mi-cuenta" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
          <li>
            <Link to="/carrito" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
