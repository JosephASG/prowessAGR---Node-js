import React from "react";
import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PasswordInput from "../../pages/Register/components/PasswordInput";

function ModalChangeUserData({ faLock, modalName }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="secondary"
        className="button-custom-account"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faLock} /> {modalName}
      </Button>
      {modalName === "Cambiar Contraseña" && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Contraseña Actual"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Ver
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Nueva Contraseña"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Ver
              </Button>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Confirmar Contraseña"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  Ver
                </Button>
              </InputGroup>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary">Cambiar</Button>
          </Modal.Footer>
        </Modal>
      )}
      {modalName === "Actualizar Email" && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Por favor, ingrese el nuevo correo electrónico.</p>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Nuevo Correo Electrónico"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />

            </InputGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary">Cambiar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ModalChangeUserData;
