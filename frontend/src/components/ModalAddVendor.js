import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { addVendor } from 'services/vendor';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ModalAddVendor = ({ isOpen, onClose }) => {
  const [newVendor, setNewVendor] = useState({
    name: '',
    city: '',
    address: '',
    phoneNumber: '',
    identification: ''
  });

  const navigate = useNavigate();


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
    setNewVendor(prev => ({ ...prev, [name]: value }));
  };


  const onSave = async (e) => {
    e.preventDefault();
    try {
      const data = await addVendor(newVendor);
      Swal.fire({
        title: 'Éxito!',
        text: 'Vendedor registrado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          onClose();
          navigate('/vendedores/');
        }
      });
    } catch (error) {
      console.error('Error al agregar el vendedor:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo registrar el vendedor: ' + error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Vendedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSave}>
          <FormGroup>
            <Form.Label>Nombre</Form.Label>
            <FormControl type="text" name="name" required value={newVendor.name} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Form.Label>Ciudad</Form.Label>
            <FormControl type="text" name="city" required value={newVendor.city} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Form.Label>Cedula/RUC/Pasaporte</Form.Label>
            <FormControl type="text" name="identification" required value={newVendor.identification} onChange={handleInputChange}>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <Form.Label>Dirección</Form.Label>
            <FormControl type="text" name="address" required value={newVendor.address} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Form.Label>Teléfono</Form.Label>
            <FormControl type="text" name="phoneNumber" required value={newVendor.phoneNumber} onChange={handleInputChange} />
          </FormGroup>
          <Button variant="primary" type="submit" style={{ marginTop: '15px' }}>
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddVendor;
