import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { checkPasswordStrength } from "../utils/formHelpers";

const PasswordInput = ({
  setPassword,
  setConfirmPassword,
  setIsPasswordsValid,
}) => {
  const [password, setPasswordLocal] = useState("");
  const [confirmPassword, setConfirmPasswordLocal] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null); // null, true, or false

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPasswordLocal(newPassword);
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
    validatePasswords(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPasswordLocal(newConfirmPassword);
    setConfirmPassword(newConfirmPassword);
    validatePasswords(password, newConfirmPassword);
  };

  const validatePasswords = (pwd, confirmPwd) => {
    const strength = checkPasswordStrength(pwd);
    setPasswordStrength(strength);
    const match = pwd && confirmPwd && pwd === confirmPwd;
    setPasswordsMatch(match);
    setIsPasswordsValid(match && strength === "Muy alta"); // Assuming "Muy alta" is the only acceptable strength
  };

  useEffect(() => {
    validatePasswords(password, confirmPassword); // Validate immediately on render to ensure initial state is correct
  }, []);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Button variant="outline-secondary" onClick={toggleVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </Button>
        </InputGroup>
        <Badge bg={passwordStrength === "Muy alta" ? "success" : "warning"} className="mt-2">
          {passwordStrength}
        </Badge>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </InputGroup>
        {passwordsMatch !== null && (
          <Badge bg={passwordsMatch ? "success" : "danger"} className="mt-2">
            {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
          </Badge>
        )}
      </Form.Group>
    </>
  );
};

export default PasswordInput;
