import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  image1,
  image2,
  image3,
  agr1,
  agr2,
  agr3,
  agr4,
  agr5,
  agr6,
} from "./index";
import "./HomePage.css";
function HomePage(props) {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(props.isLoggedIn);
  }, [props.isLoggedIn]);

  const images = [agr1, agr2, agr3, agr4, agr5, agr6];

  const cardData = [
    {
      image: image1,
      text: "Disponibilidad 24/7: Tu sitio web permite a los clientes explorar y comprar productos en cualquier momento, incluso fuera de horario comercial.",
    },
    {
      image: image2,
      text: "Información detallada: Ofrece info detallada por producto para ayudar a los clientes a decidir y generar confianza en tu marca.",
    },
    {
      image: image3,
      text: "Presencia en línea crucial hoy día. Un sitio web robusto favorece el crecimiento sostenido de tu negocio agrícola a largo plazo.",
    },
  ];

  return (
    <Container className="mt-5">
      <Card
        className="mb-5 text-center"
        style={{ backgroundColor: "rgba(0, 100, 0, 0.3)", color: "white" }}
      >
        <Card.Body>
          <Row>
            <Col md={6} className="d-flex flex-column justify-content-center">
              <h3>Prowess Agrícola</h3>
              <p>
                Descubre nuestra selección de productos agrícolas, cultivados
                con esmero y dedicación para ofrecerte lo mejor de la
                naturaleza.
              </p>
              <p>Nutriendo tu vida, del campo a tu mesa.</p>
              {logged ? (
                <h3>Hola, bienvenido</h3>
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <Link to="/registro" className="mb-2">
                    <Button variant="primary">Registro</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary">Iniciar Sesión</Button>
                  </Link>
                </div>
              )}
            </Col>
            <Col md={6}>
              <Carousel>
                {images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      style={{
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "20px",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col>
          <h1 className="text-center" style={{textShadow: "none", color:"white"}}>
            COMPRA Y VENTA DE LOS MEJORES PRODUCTOS DEL PAÍS
          </h1>
        </Col>
      </Row>

      <Row xs={1} md={3} className="g-4 justify-content-center">
        {cardData.map(({ image, text }, index) => (
          <Col key={index} className="d-flex justify-content-center p-3">
            <Card
              className="shadow-sm"
              style={{
                backgroundColor: "rgba(0, 100, 0, 0.3)",
                color: "white",
                maxWidth: "75%",
              }}
            >
              <Card.Img
                variant="top"
                src={image}
                style={{
                  height: "140px",
                  objectFit: "cover",
                  margin: "10px auto",
                  width: "auto",
                  maxWidth: "calc(100% - 20px)",
                }}
              />
              <Card.Body>
                <Card.Text>{text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
