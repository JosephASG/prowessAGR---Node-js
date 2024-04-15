import React from "react";
import { Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { deleteVendor } from "services/vendor";

function VendorCard({ vendor, setVendors, setVendorToEdit, setShowEditModal }) {
  const handleDelete = (vendorId) => {
    deleteVendor(vendorId)
      .then(() => setVendors((prev) => prev.filter((v) => v.id !== vendorId)))
      .catch((error) => console.error("Error al eliminar", error));
  };

  const handleWhatsAppClick = (phoneNumber) => {
    const message = encodeURIComponent(
      "Hola, estoy interesado en tus servicios."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Col sm={12} md={6} lg={4} className="mb-3">
      <Card className="p-3 shadow-sm">
        <Card.Body>
          <Card.Title>{vendor.name}</Card.Title>
          <Card.Text>
            Ciudad: {vendor.city}
            <br />
            Dirección: {vendor.address}
            <br />
            Teléfono: {vendor.phoneNumber}
          </Card.Text>
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="info"
              onClick={() => {
                setVendorToEdit(vendor);
                setShowEditModal(true);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              variant="success"
              onClick={() => handleWhatsAppClick(vendor.whatsappNumber)}
            >
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
            </Button>
            <Button variant="danger" onClick={() => handleDelete(vendor.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default VendorCard;
