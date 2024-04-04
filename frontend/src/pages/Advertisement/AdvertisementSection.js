import React from "react";
import { Container, Row, Col } from "react-bootstrap";


function AdvertisementSection() {
  return (
    <Container>
      <center>
        <h1>PROWESS PLANES</h1>
        <div className="p">
          <p>Descubre la Excelencia en Agricultura con Prowess Agrícola</p>
          <p>
            ¡Aumenta la productividad y optimiza tus cultivos con nuestras
            soluciones avanzadas!
          </p>
        </div>
      </center>
      <Row className="advertisement-section">
        <Col md={6}>
          <Row className="image-pair">
            <Col>
              <img
                src="https://prowessec.com/wp-content/uploads/2024/02/1.png"
                alt="Imagen Planes"
                className="advertisement-image"
              />
            </Col>
            <Col>
              <img
                src="https://prowessec.com/wp-content/uploads/2024/02/2.png"
                alt="Imagen Planes"
                className="advertisement-image"
              />
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row className="image-pair">
            <Col>
              <img
                src="https://prowessec.com/wp-content/uploads/2024/02/3.png"
                alt="Imagen Planes"
                className="advertisement-image"
              />
            </Col>
            <Col>
              <img
                src="https://prowessec.com/wp-content/uploads/2024/02/4.png"
                alt="Imagen Planes"
                className="advertisement-image"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvertisementSection;
