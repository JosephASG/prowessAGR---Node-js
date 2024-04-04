import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Button, Card } from "react-bootstrap";
import image1 from "../imagenes/24.png";
import image2 from "../imagenes/info.png";
import image3 from "../imagenes/crecimiento.png";
import agr1 from "../imagenes/agr3.jpg";
import agr2 from "../imagenes/agr2.jpg";
import agr3 from "../imagenes/agr5.jpg";
import agr4 from "../imagenes/agr4.jpg";
import agr5 from "../imagenes/agr1.jpg";
import agr6 from "../imagenes/agr.jpg";

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

  const cardStyle = {
    maxWidth: "18rem",
    margin: "auto",
    border: "1px solid #FF8C00",
    borderRadius: "5px",
    backgroundColor: "rgba(47, 134, 166, 0.3)",
    color: "white",
  };
  return (
    <Container className="home-page">
      <Row className="home-page-content">
        <Col
          md={6}
          className="home-page-subtitle d-flex flex-column align-items-center justify-content-center"
        >
          <h3 className="text-center">Prowess Agrícola</h3>
          <p className="text-center">
            Descubre nuestra selección de productos agrícolas, cultivados con
            esmero y dedicación para ofrecerte lo mejor de la naturaleza.
          </p>
          <p className="text-center">Nutriendo tu vida, del campo a tu mesa.</p>
          {logged ? (
            <h3 className="text-center">Hola, bienvenido</h3>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <Link to="/registro" className="mb-2">
                <Button variant="primary" className="RegistroHome">
                  Registro
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="RegistroHome">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          )}
        </Col>

        <Col md={6} className="home-page-carousel">
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
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className="part2">
        <Col>
          <h1>COMPRA Y VENTA DE LOS MEJORES PRODUCTOS DEL PAÍS</h1>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-4">
        {cardData.map(({ image, text }, index) => (
          <Col key={index}>
            <Card className="h-100" style={cardStyle}>
              <Card.Img
                variant="top"
                src={image}
                style={{ height: "150px", objectFit: "cover" }}
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
