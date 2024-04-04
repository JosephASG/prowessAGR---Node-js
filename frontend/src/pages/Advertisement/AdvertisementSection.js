import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./AdvertisementSection.css";

function AdvertisementSection() {
  return (
    <Container>
      <center>
        <h1>PROWESS PLANES</h1>
        <div className="p-anuncios">
          <p>Descubre la Excelencia en Agricultura con Prowess Agrícola</p>
          <p>
            ¡Aumenta la productividad y optimiza tus cultivos con nuestras
            soluciones avanzadas!
          </p>
        </div>
      </center>
      <Row className="advertisement-section-anuncios">
        <Col md={12}>
          <Row className="image-pair-anuncios">
            <Col>
              <img
                src="https://prowessec.com/wp-content/uploads/2024/02/1.png"
                alt="Imagen Planes"
                className="advertisement-image-anuncios"
              />
            </Col>
            <Col>
              <img
                src="https://prowessec.com/wp-content/uploads/2024/02/2.png"
                alt="Imagen Planes"
                className="advertisement-image-anuncios"
              />
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <Row className="image-pair-anuncios">
            <Col>
              <img
                src="https://prowessec.com/wp-content/uploads/2024/02/3.png"
                alt="Imagen Planes"
                className="advertisement-image-anuncios"
              />
            </Col>
            <Col>
              <img
                src="https://prowessec.com/wp-content/uploads/2024/02/4.png"
                alt="Imagen Planes"
                className="advertisement-image-anuncios"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvertisementSection;
