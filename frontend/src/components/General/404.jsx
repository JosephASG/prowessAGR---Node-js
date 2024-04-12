import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceShuttle, faSatelliteDish, faRocket } from '@fortawesome/free-solid-svg-icons';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <Container fluid className="text-center not-found-container">
      <Row className="justify-content-center align-items-center" style={{ height: '75vh' }}>
        <Col xs={12}>
          <FontAwesomeIcon icon={faSpaceShuttle} className="floating-icon shuttle" size="4x" />
          <FontAwesomeIcon icon={faSatelliteDish} className="floating-icon satellite" size="3x" />
          <FontAwesomeIcon icon={faRocket} className="floating-icon rocket" size="5x" />
          <h1 className="mb-4">404</h1>
          <h2>Página No Encontrada</h2>
          <p>Lo sentimos, el contenido que buscas está en otra galaxia.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
