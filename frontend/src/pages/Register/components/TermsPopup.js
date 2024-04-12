import { Modal, Button } from "react-bootstrap";

const TermsPopup = ({ showPopup, setShowPopup }) => {
  return (
    <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Términos y Condiciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Los términos y condiciones de uso establecen las pautas para interactuar
        con el sitio web de Prowess Agrícola, abarcando desde la adquisición de
        productos hasta el registro de usuarios. Se detallan responsabilidades
        del usuario, como la veracidad de la información proporcionada, así como
        las acciones prohibidas, como el uso no autorizado de dispositivos. Se
        abordan temas como la privacidad, la suspensión de cuentas por
        incumplimiento, la propiedad intelectual, y se establecen claramente las
        garantías y responsabilidades en las transacciones comerciales.{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowPopup(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsPopup;
