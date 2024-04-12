import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  FormCheck,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import Swal from "sweetalert2";
import Mapa from "components/Mapa.js";

import DocumentTypeInput from "./components/DocumentTypeInput";
import PasswordInput from "./components/PasswordInput";
import TermsPopup from "./components/TermsPopup";
import UserInfoInput from "./components/UserInfoInput";
import UserLocationInput from "./components/UserLocationInput";

import { registerApp } from "../../services/auth";
import { fetchProvinces } from "./utils/formHelpers";

function Register() {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("select");
  const [nCedula, setNCedula] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [latitud, setLatitud] = useState("");
  const [altitud, setAltitud] = useState("");
  const [isPasswordsValid, setIsPasswordsValid] = useState(false);
  const [roleUser, setRoleUser] = useState("");
  const [address, setaddress] = useState("");
  const [cellphone, setCellphone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProvinces(setProvinces);
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      const formData = {
        name: name,
        secondName: secondName,
        lastName: lastName,
        secondLastName: secondLastName,
        email: email,
        password: password,
        tipoDocumento: tipoDocumento,
        nCedula: nCedula,
        province: province,
        city: city,
        latitud: latitud,
        altitud: altitud,
        roleUser: roleUser,
      };

      try {
        const response = await registerApp(formData);
        Swal.fire("Registro Exitoso", "", "success");
      } catch (error) {
        console.error("Error en el registro:", error.message);
        Swal.fire("Error en el registro", error.message, "error");
      }
    } else {
      Swal.fire(
        "Error en el formulario",
        "Por favor, revisa los campos.",
        "error"
      );
    }
  };

  const isFormValid = () => {
    return email.includes("@") && isPasswordsValid && termsAccepted;
  };

  const handleLocationSelect = ({ lat, lng }) => {
    console.log("Location Selected:", lat, lng);
    setLatitud(lat.toFixed(4));
    setAltitud(lng.toFixed(4));
  };

  return (
    <Container
      className="mt-5"
      style={{ maxWidth: "45%", margin: "0 auto 25px" }}
    >
      <Card>
        <Card.Header as="h5">Registro de Usuarios</Card.Header>
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <Row>
              <Col>
                <UserInfoInput
                  label="Nombre"
                  value={name}
                  setValue={setName}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                />
                <UserInfoInput
                  label="Segundo Nombre"
                  value={secondName}
                  setValue={setSecondName}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                />
              </Col>
              <Col>
                <UserInfoInput
                  label="Apellido"
                  value={lastName}
                  setValue={setLastName}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                />
                <UserInfoInput
                  label="Segundo Apellido"
                  value={secondLastName}
                  setValue={setSecondLastName}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                />
              </Col>
              <Col>
                <UserInfoInput
                  label="Dirección"
                  value={address}
                  setValue={setaddress}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                />
                <UserInfoInput
                  label="Telefono"
                  value={cellphone}
                  setValue={setCellphone}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <DocumentTypeInput
                tipoDocumento={tipoDocumento}
                setTipoDocumento={setTipoDocumento}
                setNCedula={setNCedula}
              />

              <PasswordInput
                password={password}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                setIsPasswordsValid={setIsPasswordsValid}
              />
            </Row>
            <Mapa onLocationSelect={handleLocationSelect} />
            <Row className="mb-4 align-items-center">
              <p className="register-subtitle">Seleccione su ubicación:</p>
              <UserLocationInput
                provinces={provinces}
                province={province}
                setProvince={setProvince}
                city={city}
                setCity={setCity}
              />
            </Row>
            <Row>
              <Col>
                <Row className="mb-3">
                  <Col>
                    <h4>Seleccione su rol:</h4>
                    <div
                      className="btn-group btn-group-toggle"
                      role="group"
                      aria-label="Role selection"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="roles"
                        id="roleClient"
                        autoComplete="off"
                        value="client"
                        checked={roleUser === "client"}
                        onChange={(e) => setRoleUser(e.target.value)}
                        hidden
                      />
                      <label
                        className={`btn ${
                          roleUser === "client"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        htmlFor="roleClient"
                      >
                        Cliente
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="roles"
                        id="roleVendor"
                        autoComplete="off"
                        value="vendor"
                        checked={roleUser === "vendor"}
                        onChange={(e) => setRoleUser(e.target.value)}
                        hidden
                      />
                      <label
                        className={`btn ${
                          roleUser === "vendor"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        htmlFor="roleVendor"
                      >
                        Vendedor
                      </label>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-3 align-items-center">
              <Col xs="auto">
                <FormCheck
                  type="checkbox"
                  label="Acepto los términos y condiciones"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
              </Col>

              <Col xs="auto">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setShowTermsPopup(true)}
                >
                  Ver Términos
                </Button>
              </Col>
            </Row>

            {showTermsPopup && (
              <TermsPopup
                showPopup={showTermsPopup}
                setShowPopup={setShowTermsPopup}
              />
            )}

            <Button type="submit" disabled={!isFormValid()} className="mt-3">
              Registrarse
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
