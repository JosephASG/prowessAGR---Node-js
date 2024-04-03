import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "imagenes/prowess-logo1.png";
import "./NavigationBar.css";
function NavigationBar(props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "none" }}
        className={`${scrolled ? "scrolled" : ""} text-custom-header`}
      >
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
              <Nav.Link
                style={{ color: "white" }}
                className="text-custom-header"
                as={Link}
                to="/"
              >
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
              {props.role === "vendedor" && (
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
              {props.role === "administrador" && (
                <>
                  <Nav.Link
                    as={Link}
                    style={{ color: "white" }}
                    to="/vendedores"
                  >
                    Vendedores
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    style={{ color: "white" }}
                    to="/Categories"
                  >
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
              {props.role === "cliente" && (
                <Nav.Link as={Link} style={{ color: "white" }} to="/tienda">
                  Tienda
                </Nav.Link>
              )}
              {props.cart.length > 0 ? (
                <Nav.Link
                  as={Link}
                  to="/carrito"
                  className="text-custom-header position-relative"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ color: "white" }}
                  />
                  {props.cart.length > 0 ? (
                    <Badge pill bg="danger" className="cart-badge-position">
                      {props.cart.length}
                    </Badge>
                  ) : null}
                </Nav.Link>
              ) : null}
            </Nav>
            <Nav>
              {props.isLoggedIn ? (
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
    </Container>
  );
}

export default NavigationBar;
