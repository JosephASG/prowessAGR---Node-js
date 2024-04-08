import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Badge, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "imagenes/prowess-logo1.png";
import "./NavigationBar.css";

function NavigationBar({ role, isLoggedIn }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();  // Actualizar al cargar el componente

    const handleCartUpdate = () => updateCartCount();  // Función para actualizar cuando el carrito cambia

    window.addEventListener("cartUpdated", handleCartUpdate);  // Escuchar el evento personalizado

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);  // Limpiar el listener
    };
  }, []);

  return (
    <Navbar expand="lg" className="text-custom-header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "white", borderColor: "white" }}
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} style={{ color: "white" }} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} style={{ color: "white" }} to="/about">
              ¿Quiénes Somos?
            </Nav.Link>
            <Nav.Link as={Link} style={{ color: "white" }} to="/tienda">
              Tienda
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{ color: "white" }}
              to="https://informacion.prowessec.com/home"
            >
              Vinculacion
            </Nav.Link>
            <Nav.Link as={Link} style={{ color: "white" }} to="/advertismenet">
              Anuncios
            </Nav.Link>
            {role === "vendedor" && (
              <>
                <Nav.Link
                  as={Link}
                  style={{ color: "white" }}
                  to="/product-list"
                >
                  Gestionar Producto
                </Nav.Link>
                <Nav.Link as={Link} style={{ color: "white" }} to="/sales">
                  Ventas
                </Nav.Link>
              </>
            )}
            {role === "administrador" && (
              <>
                <Nav.Link as={Link} style={{ color: "white" }} to="/vendedores">
                  Vendedores
                </Nav.Link>
                <Nav.Link as={Link} style={{ color: "white" }} to="/Categories">
                  Categorías
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  style={{ color: "white" }}
                  to="/product-list"
                >
                  Productos
                </Nav.Link>
                <Nav.Link as={Link} style={{ color: "white" }} to="/users">
                  Usuarios
                </Nav.Link>
              </>
            )}
            {cartCount > 0 && (
              <Nav.Link
                as={Link}
                to="/carrito"
                className="text-custom-header position-relative"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ color: "white" }}
                />
                <Badge pill bg="danger" className="cart-badge-position">
                  {cartCount}
                </Badge>
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link as={Link} style={{ color: "white" }} to="/mi-cuenta">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} style={{ color: "white" }} to="/login">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
