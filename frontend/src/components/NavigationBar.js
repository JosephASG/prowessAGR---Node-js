import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import logo from "../imagenes/prowess-logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faBars, } from "@fortawesome/free-solid-svg-icons";

function NavigationBar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  useEffect(() => {
    if (props.isLoggedIn) {
      setLogged(true);
      setRole(props.role);
    }
    if (!props.isLoggedIn) {
      setLogged(false);
      setRole("");
    }
  }, [props.isLoggedIn, props.role]);

  useEffect(() => {
      setCartCount(props.cart.length);
  }, [props.cart]);

  document.addEventListener('DOMContentLoaded', function() {
    const gestionVinculacion = document.getElementById('gestionVinculacion');
    const levantamientoInformacion = document.getElementById('levantamientoInformacion');
  
    gestionVinculacion.addEventListener('mouseenter', function() {
      levantamientoInformacion.style.display = 'block';
    });
  
    gestionVinculacion.addEventListener('mouseleave', function() {
      levantamientoInformacion.style.display = 'none';
    });
  });
  
  useEffect(() => {
    // Función que maneja el evento de scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 0);
    };

    // Agregar el event listener al montar el componente
    window.addEventListener("scroll", handleScroll);

    // Eliminar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[]);

  return (
    <nav className={`navigation-bar ${scrolled ? "scrolled" : ""}`}>
      <div className={`navigation-container ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <button
          className={`hamburger-menu ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {role === "vendedor" ? (
          <ul className={`navigation-list ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <a href="https://informacion.prowessec.com/home" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>
                Gestion de Vinculacion
              </a>
            </li>
            <li>
              <Link to="/tienda" onClick={toggleMenu}>
                Tienda
              </Link>
            </li>
            <li>
              <Link to="/nosotros" onClick={toggleMenu}>
                ¿Quiénes Somos?
              </Link>
            </li>
            <li>
              {
                //Por Hacer Ruta para agregar producto
              }
              <Link to="/add-product" onClick={toggleMenu}>
                Gestionar Producto
              </Link>
            </li>
            <li>
              <Link to="/sales" onClick={toggleMenu}>
                Ventas
              </Link>
            </li>
            <li>
              <Link to="/carrito" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
              <div className="cuantity-shopping-cart-container">
                <span className="cuantity-shopping-cart">{cartCount}</span>
              </div>
            </li>
            <li>
              {logged ? (
                <Link to="/mi-cuenta" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              ) : (
                <Link to="/login" onClick={toggleMenu}>
                  {" "}
                  Iniciar Sesion{" "}
                </Link>
              )}
            </li>
          </ul>
        ) : role === "administrador" ? (
          <ul className={`navigation-list ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <a href="https://informacion.prowessec.com/home" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>
                Gestion de Vinculacion
              </a>
            </li>
            <li>
              <Link to="/tienda" onClick={toggleMenu}>
                Tienda
              </Link>
            </li>
            <li>
              <Link to="/nosotros" onClick={toggleMenu}>
                ¿Quiénes Somos?
              </Link>
            </li>
            <li>
              <Link to="/vendedores" onClick={toggleMenu}>
                Vendedores
              </Link>
            </li>
            <li>
              <Link to="/sales" onClick={toggleMenu}>
                Ventas
              </Link>
            </li>
            <li>
              <Link to="/Categories" onClick={toggleMenu}>
                Categorías
              </Link>
            </li>
            <li>
              <Link to="/product-list" onClick={toggleMenu}>
                Productos
              </Link>
            </li>
            <li>
              <Link to="/carrito" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
              <div className="cuantity-shopping-cart-container">
                <span className="cuantity-shopping-cart">{cartCount}</span>
              </div>
            </li>
            <li>
              <Link to="/users" onClick={toggleMenu}>
                Usuarios
              </Link>
            </li>
            <li>
              {logged ? (
                <Link to="/mi-cuenta" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              ) : (
                <Link to="/login" onClick={toggleMenu}>
                  {" "}
                  Iniciar Sesion{" "}
                </Link>
              )}
            </li>
          </ul>
        ) : role === "cliente" ? (
          <ul className={`navigation-list ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <a href="https://informacion.prowessec.com/home" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>
                Gestion de Vinculacion
              </a>
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
              <Link to="/nosotros" onClick={toggleMenu}>
                ¿Quiénes Somos?
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
              <div className="cuantity-shopping-cart-container">
                <span className="cuantity-shopping-cart">{cartCount}</span>
              </div>
            </li>
            <li>
              {logged ? (
                <Link to="/mi-cuenta" onClick={toggleMenu}>
                  Iniciado
                </Link>
              ) : (
                <Link to="/login" onClick={toggleMenu}>
                  {" "}
                  Iniciar Sesion{" "}
                </Link>
              )}
            </li>
          </ul>
        ) : (
          <ul className={`navigation-list ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            <li id="gestionVinculacion">
               Gestion de Vinculacion
            <ul id="levantamientoInformacion" style={{ display: 'none', backgroundColor: '#ffffff', padding: '7px', borderRadius: '2px', 
             position: 'absolute', top: '60px', left: '32.3%', zIndex: '999', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.3)' }}>
              <li style={{ listStyle: 'none' }}>
               <h4 style={{ margin: '0', marginBottom: '3px', fontSize: '8px', color: '#000', fontWeight: 'bold' }}></h4>
              <a href="https://informacion.prowessec.com/" target="_blank" rel="noopener noreferrer" onClick={toggleMenu} style={{ color: '#000', fontSize: '12px', fontWeight: 'bold' }}>
                   Levantamiento Información
                 </a>
                 </li>
                </ul>
               </li>
            <li>
              <Link to="/nosotros" onClick={toggleMenu}>
                ¿Quiénes Somos?
              </Link>
            </li>
            <li>
              <Link to="/Anuncios" onClick={toggleMenu}>
                Anuncios
              </Link>
            </li>
            <li>
              {logged ? (
                <li>
                  <Link to="/mi-cuenta" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
              ) : (
                <Link to="/login" onClick={toggleMenu}>
                  {" "}
                  Iniciar Sesion{" "}
                </Link>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
