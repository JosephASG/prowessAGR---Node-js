import React, { useState } from "react";
import { Form, Badge } from "react-bootstrap";
import { handleCedulaBlur } from "../utils/formHelpers"; // Make sure the path is correct

const DocumentTypeInput = ({ tipoDocumento, setTipoDocumento, setNCedula }) => {
  const [nCedula, updateNCedula] = useState("");
  const [cedulaValid, setCedulaValid] = useState(null); // null, true, or false

  const handleCedulaChange = (event) => {
    const newCedula = event.target.value;
    updateNCedula(newCedula); // Updates local state
    setNCedula(newCedula); // Updates parent state and triggers validation if needed
  };

  const onBlurCedula = () => {
    handleCedulaBlur(nCedula, tipoDocumento, setCedulaValid); // Pass the tipoDocumento to the validation function
  };

  const handleDocumentTypeChange = (event) => {
    const newTipoDocumento = event.target.value;
    setTipoDocumento(newTipoDocumento);
    updateNCedula(""); // Reset Cedula when document type changes
    setCedulaValid(null); // Reset validation state on type change
  };

  return (
    <>
      <Form.Group controlId="documentTypeInput">
        <Form.Label>Seleccione el tipo de documento</Form.Label>
        <Form.Control
          as="select"
          value={tipoDocumento}
          onChange={handleDocumentTypeChange}
          required
        >
          <option value="select">Selecciona</option>
          <option value="cedula">Cédula</option>
          <option value="ruc">RUC</option>
          <option value="pasaporte">Pasaporte</option>
        </Form.Control>
      </Form.Group>

      {tipoDocumento !== "select" && (
        <Form.Group controlId="documentNumberInput">
          <Form.Label>Número de Documento</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Número de ${
              tipoDocumento === "cedula"
                ? "Cédula"
                : tipoDocumento === "pasaporte"
                ? "Pasaporte"
                : "RUC"
            }`}
            maxLength={tipoDocumento === "ruc" ? 13 : 10}
            value={nCedula}
            onChange={handleCedulaChange}
            onBlur={onBlurCedula} // Add onBlur handler
          />
          {cedulaValid !== null && (
            <Badge bg={cedulaValid ? "success" : "danger"}>
              {cedulaValid ? "Válido" : "Inválido"}
            </Badge>
          )}
        </Form.Group>
      )}
    </>
  );
};

export default DocumentTypeInput;
