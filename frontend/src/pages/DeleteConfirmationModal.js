import React from "react";
import { Modal, Button } from "react-bootstrap";

// Componente de modal para confirmar la eliminación de un usuario
const DeleteConfirmationModal = ({ user, show, onHide, onDelete }) => {
  return (
    // Modal de Bootstrap para mostrar la confirmación de eliminación
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Mensaje de confirmación mostrando el nombre del usuario a eliminar */}
        ¿Seguro que desea eliminar al usuario: "{user.name} {user.secondName} {user.lastName} {user.secondLastName}"?
      </Modal.Body>
      <Modal.Footer>
        {/* Botón para cancelar la eliminación y cerrar el modal */}
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        {/* Botón para confirmar la eliminación del usuario */}
        <Button variant="danger" onClick={() => onDelete(user.id)}>
          Sí
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
