import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

const UserLocationInput = ({
  provinces,
  province,
  setProvince,
  city,
  setCity,
}) => {
  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setCity(""); // Reset city when province changes
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const getCityOptions = () => {
    const selectedProvince = provinces.find(p => p.name === province);
    return selectedProvince ? selectedProvince.cities.map(c => (
      <option key={c} value={c}>{c}</option>
    )) : [];
  };

  return (
    <Container>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formProvince">
              <Form.Label>Provincia:</Form.Label>
              <Form.Control as="select" value={province} onChange={handleProvinceChange} required>
                <option value="">Seleccione una provincia</option>
                {provinces.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCity">
              <Form.Label>Ciudad:</Form.Label>
              <Form.Control as="select" value={city} onChange={handleCityChange} required>
                <option value="">Seleccione una ciudad</option>
                {getCityOptions()}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
    </Container>
  );
};

export default UserLocationInput;
