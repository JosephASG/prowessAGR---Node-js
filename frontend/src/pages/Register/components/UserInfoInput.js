import React from "react";
import { Form } from "react-bootstrap";

const UserInfoInput = ({ label, value, setValue, pattern }) => {
  const handleChange = (e) => {
    if (new RegExp(pattern).test(e.target.value) || e.target.value === "") {
      setValue(e.target.value);
    }
  };

  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          value={value}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        Por favor ingrese un nombre válido.
      </Form.Control.Feedback>
    </>
  );
};

export default UserInfoInput;
