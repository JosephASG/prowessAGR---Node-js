// Importaciones necesarias desde React y react-bootstrap
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Definición del componente EditUserModal
// Recibe cuatro props: show, onHide, user, y onSave
const EditUserModal = ({ show, onHide, user, onSave }) => {
  // Definición del estado local formData, que almacena los datos del formulario
  const [formData, setFormData] = useState({
    name: '',           // Nombre del usuario
    secondName: '',     // Segundo nombre del usuario
    lastName: '',       // Apellido del usuario
    secondLastName: '', // Segundo apellido del usuario
    province: '',       // Provincia del usuario
    city: '',           // Ciudad del usuario
    address: '',        // Dirección del usuario
    email: '',          // Correo electrónico del usuario
    nCedula: '',        // Número de cédula del usuario
    cellphone: '',      // Teléfono del usuario
    roleUser: '',       // Tipo de usuario (rol)
  });

  // useEffect para actualizar formData cuando la prop user cambia
  useEffect(() => {
    // Si se proporciona un objeto user, actualiza formData con sus datos
    if (user) {
      setFormData(user); // Actualiza el estado formData con los datos del usuario
    }
  }, [user]); // Solo se ejecuta cuando la prop user cambia

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo que cambió
    // Actualiza el estado formData con el nuevo valor del campo
    setFormData((prevData) => ({
      ...prevData,      // Copia los datos previos
      [name]: value,    // Actualiza solo el campo que cambió
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    onSave(formData);   // Llama a la función onSave con los datos del formulario para guardarlos
  };

  // Renderizado del componente
  return (
    // Modal de react-bootstrap, se muestra u oculta basado en la prop show
    <Modal show={show} onHide={onHide}>
      {/* Encabezado del modal con un botón para cerrarlo */}
      <Modal.Header closeButton>
        {/* Título del modal */}
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      {/* Cuerpo del modal */}
      <Modal.Body>
        {/* Formulario que llama a handleSubmit al enviar */}
        <Form onSubmit={handleSubmit}>
          {/* Campo para el nombre del usuario */}
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"          // Tipo de input: texto
              name="name"          // Nombre del campo
              value={formData.name} // Valor actual del campo
              onChange={handleChange} // Maneja cambios en el campo
            />
          </Form.Group>
          {/* Campo para el segundo nombre del usuario */}
          <Form.Group controlId="formSecondName">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Campo para el apellido del usuario */}
          <Form.Group controlId="formLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Campo para el segundo apellido del usuario */}
          <Form.Group controlId="formSecondLastName">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="secondLastName"
              value={formData.secondLastName}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Campo para la provincia del usuario */}
          <Form.Group controlId="formProvince">
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Campo para la ciudad del usuario */}
          <Form.Group controlId="formCity">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Campo para la dirección del usuario */}
          <Form.Group controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Campo para el correo electrónico del usuario */}
          <Form.Group controlId="formEmail">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"        // Tipo de input: email
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Campo para el número de cédula del usuario */}
          <Form.Group controlId="formNCedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="nCedula"
              value={formData.nCedula}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Campo para el teléfono del usuario */}
          <Form.Group controlId="formCellphone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
            />
          <Form.Group controlId="formRoleUser">
            <Form.Label>Tipo de Usuario</Form.Label>
            <Form.Control
              as="select"
              name="roleUser"
              value={formData.roleUser}
              onChange={handleChange}
            >
              <option value="vendedor">vendedor</option>
              <option value="administrador">administrador</option>
              <option value="cliente">cliente</option>
            </Form.Control>
          </Form.Group>
          </Form.Group>
          {/* Botón para enviar el formulario */}
          <Button variant="primary" type="submit" className="mt-3">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal; // Exporta el componente EditUserModal para su uso en otras partes de la aplicación
