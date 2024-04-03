import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "imagenes/prowess-logo1.png";

function NavigationBar(props) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#008238" }}
      className={`${scrolled ? "scrolled" : ""} text-custom-header`}
      >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" height="30" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros">
              ¿Quiénes Somos?
            </Nav.Link>
            {props.role === "vendedor" && (
              <>
                <Nav.Link as={Link} to="/product-list">
                  Gestionar Producto
                </Nav.Link>
                <Nav.Link as={Link} to="/sales">
                  Ventas
                </Nav.Link>
              </>
            )}
            {props.role === "administrador" && (
              <>
                <Nav.Link as={Link} to="/vendedores">
                  Vendedores
                </Nav.Link>
                <Nav.Link as={Link} to="/Categories">
                  Categorías
                </Nav.Link>
                <Nav.Link as={Link} to="/product-list">
                  Productos
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Usuarios
                </Nav.Link>
              </>
            )}
            {props.role === "cliente" && (
              <Nav.Link as={Link} to="/tienda">
                Tienda
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/carrito">
              <FontAwesomeIcon icon={faShoppingCart} />
              {props.cart.length > 0 && (
                <Badge pill bg="danger">
                  {props.cart.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
          <Nav>
            {props.isLoggedIn ? (
              <Nav.Link as={Link} to="/mi-cuenta">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
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
