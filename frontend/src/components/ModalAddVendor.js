import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, InputGroup, Label } from 'react-bootstrap';

const WEBURL = process.env.REACT_APP_API_URL;

const ModalAddVendor = ({ isOpen, onClose, handleAddVendor }) => {
  const [newVendor, setNewVendor] = useState({
    name: '',
    city: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({
      ...newVendor,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    fetch(`${WEBURL}/fb/vendedor/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVendor),
    })
    .then((response) => {
      if (response.ok) {
        handleAddVendor(newVendor); // Assuming handleAddVendor updates the parent state
        onClose();
      } else {
        console.error('Error al agregar el vendedor en el servidor');
      }
    })
    .catch((error) => {
      console.error('Error de red al agregar el vendedor', error);
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Vendedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSave}>
          <FormGroup>
            <Form.Label htmlFor="name">Nombre</Form.Label>
            <FormControl
              type="text"
              name="name"
              required
              value={newVendor.name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label htmlFor="city">Ciudad</Form.Label>
            <FormControl
              type="text"
              name="city"
              required
              value={newVendor.city}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label htmlFor="address">Dirección</Form.Label>
            <FormControl
              type="text"
              name="address"
              required
              value={newVendor.address}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label htmlFor="phoneNumber">Teléfono</Form.Label>
            <FormControl
              type="text"
              name="phoneNumber"
              required
              value={newVendor.phoneNumber}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button variant="primary" style={{marginTop:"15px"}} type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddVendor;
