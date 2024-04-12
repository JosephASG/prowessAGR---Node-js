//Colores verde claro: #008238
//Colores verde oscuro: #003817
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Image,
  Tab,
  Row,
  Col,
  Nav,
} from "react-bootstrap";
import "./MyAccountPage.css";
import { checkToken } from "../../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faAddressBook,
  faPhone,
  faLock,
  faEnvelope,
  faCamera,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const ProfileTab = ({ user }) => (
  <Tab.Pane eventKey="perfil">
    <p style={{ color: "black", textAlign: "left" }}>
      <FontAwesomeIcon icon={faAddressBook} /> <strong>Provincia:</strong>{" "}
      {user.provinciaUsuario}
    </p>
    <p style={{ color: "black", textAlign: "left" }}>
      <FontAwesomeIcon icon={faCity} /> <strong>Ciudad:</strong>{" "}
      {user.ciudadUsuario}
    </p>
    <p style={{ color: "black", textAlign: "left" }}>
      <FontAwesomeIcon icon={faAddressBook} /> <strong>Dirección:</strong>{" "}
      {user.direccionUsuario}
    </p>
    <p style={{ color: "black", textAlign: "left" }}>
      <FontAwesomeIcon icon={faPhone} /> <strong>Teléfono:</strong>{" "}
      {user.telefonoUsuario}
    </p>
  </Tab.Pane>
);

const SecurityTab = () => (
  <Tab.Pane eventKey="seguridad">
    <Row className="justify-content-center mb-4">
      <Col xs={12} className="text-center text-custom-account">
        <h3>Configuraciones de Seguridad</h3>
        <p className="text-custom-account">Administra y asegura tu cuenta.</p>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col md={6} className="d-flex justify-content-center mb-3">
        <Button variant="secondary" className="button-custom-account">
          <FontAwesomeIcon icon={faLock} /> Cambiar Contraseña
        </Button>
      </Col>
      <Col md={6} className="d-flex justify-content-center mb-3">
        <Button variant="secondary" className="button-custom-account">
          <FontAwesomeIcon icon={faEnvelope} /> Actualizar Email
        </Button>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col md={6} className="d-flex justify-content-center mb-3">
        <Button variant="secondary" className="button-custom-account">
          <FontAwesomeIcon icon={faPhone} /> Actualizar Número de Teléfono
        </Button>
      </Col>
      <Col md={6} className="d-flex justify-content-center mb-3">
        <Button variant="secondary" className="button-custom-account">
          <FontAwesomeIcon icon={faUserShield} /> Configuraciones de Privacidad
        </Button>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col xs={12} className="text-center mt-3">
        <p className="text-custom-account">
          Es importante mantener tus datos actualizados para proteger tu cuenta
          y asegurar su recuperación en caso necesario.
        </p>
      </Col>
    </Row>
  </Tab.Pane>
);

const PurchasesTab = ({ user }) => (
  <Tab.Pane eventKey="compras">
    <p>
      <strong>Estado de Compra:</strong> {user.purchaseStatus}
    </p>
    <span>
      <h4>Ver compras</h4>
    </span>
  </Tab.Pane>
);

function MyAccountPage({ setIsLoggedIn, setRole }) {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const res = await checkToken(token);
          setUser(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole("");
    navigate("/login");
  };

  //Seccion Cambio de Imagen
  const fileInputRef = useRef();
  const handleImageChange = (event) => {
    // Aquí podrías subir la imagen a un servidor o actualizar el estado
    // Por ejemplo, si estás usando un estado para manejar la imagen del usuario:
    if (event.target.files && event.target.files[0]) {
      // Suponiendo que tienes una función que actualiza la imagen del usuario
      // uploadUserImage(event.target.files[0]);
    }
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <Container 
    style={{marginTop: "8%"}}
    className="d-flex justify-content-center align-items-center">
      <Card
        style={{ width: "100%", maxWidth: "800px" }}
        className="shadow-lg my-3"
      >
        <Card.Header
          className="text-center text-custom-account-header-card"
          style={{
            backgroundColor: "white",
            border: "none",
            textShadow: "none",
            margin: "5px",
          }}
        >
          Hola Bienvenido, {user.nombre} {user.apellido}
        </Card.Header>
        <Card.Body>
          <Tab.Container id="account-tabs" defaultActiveKey="perfil">
            <Row>
              <Col
                sm={3}
                className="mb-3 mb-sm-0 d-flex flex-column align-items-center"
              >
                <>
                  <div
                    className="image-container"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={handleImageClick}
                    style={{
                      width: "100px",
                      height: "100px",
                      position: "relative",
                      cursor: "pointer",
                      borderRadius: "50%",
                      overflow: "hidden",
                      backgroundColor: "gray",
                    }}
                  >
                    <Image
                      src={user.imagenUsuario}
                      alt={user.nombreUsuario}
                      roundedCircle
                      className={`img-fluid mb-3 ${isHovering ? "hover" : ""}`}
                    />
                    {isHovering && (
                      <FontAwesomeIcon
                        icon={faCamera}
                        className="image-icon"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "2em",

                          color: "white",
                          zIndex: 2,
                        }}
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </>

                <ListGroup className="w-100">
                  <Nav
                    variant="pills"
                    className="flex-column"
                    style={{ marginTop: "10px" }}
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="perfil">Perfil</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="seguridad">Seguridad</Nav.Link>
                    </Nav.Item>
                    {user.role === "buyer" && (
                      <Nav.Item>
                        <Nav.Link eventKey="compras">Compras</Nav.Link>
                      </Nav.Item>
                    )}
                  </Nav>
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    className="mt-3 button-custom-account"
                  >
                    Cerrar Sesión
                  </Button>
                </ListGroup>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <ProfileTab user={user} />
                  <SecurityTab />
                  {user.rol === "buyer" && <PurchasesTab user={user} />}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MyAccountPage;
