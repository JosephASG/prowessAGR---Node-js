import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';  // Si necesitas un carrusel, considera instalar 'react-bootstrap/Carousel'
import image1 from '../imagenes/denegado.png';

function AccessDeniedPage() {
  return (
    <Container className="mt-5" style={{color:"white", marginBottom:"50px"}}>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h1 className="mb-3">Acceso Denegado</h1>
          <p>No puedes acceder a esta página debido a las restricciones de tu rol.</p>
          <p>Gracias por tu comprensión.</p>
          <img src={image1} alt="Acceso Denegado" className="img-fluid" />
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs={12} sm={6} md={4} className="text-center">
          <Link to="/registro">
            <Button variant="primary" size="lg" className="mb-2 w-100">Registro</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="w-100">Iniciar Sesión</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default AccessDeniedPage;
