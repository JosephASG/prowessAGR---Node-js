import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import ModalPassword from "../components/ModalPassword";
import Swal from "sweetalert2";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';  
import Loading from "../components/General/Loading";


function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showCodeVerificationModal, setShowCodeVerificationModal] =
    useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  
  const checkPasswordStrength = (newPassword) => {
    // Evaluar la longitud de la contraseña
    if (newPassword.length < 6) {
      return "Débil"; // Contraseña demasiado corta
    }

    // Evaluar la complejidad de la contraseña
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);

    // Determinar la fuerza de la contraseña en función de la complejidad
    if (hasNumber && hasSpecialChar && hasUpperCase && hasLowerCase) {
      return "Muy alta"; // Todos los criterios cumplidos
    } else if (
      (hasNumber && hasUpperCase) ||
      (hasNumber && hasSpecialChar) ||
      (hasUpperCase && hasSpecialChar)
    ) {
      return "Alta"; // Cumple con dos de los criterios
    } else if (hasNumber || hasSpecialChar || hasUpperCase || hasLowerCase) {
      return "Media"; // Cumple con uno de los criterios
    } else {
      return "Débil"; // No cumple con ninguno de los criterios
    }
  };

  const handlePasswordBlur = (e) => {
    const confirmPasswordValue = e.target.value;
    if (newPassword === confirmPasswordValue && passwordStrength !== "Débil") {
      setValidPassword(true);
      setError("");
    } else {
      setValidPassword(false);
      newPassword !== confirmPasswordValue &&
        setError("Las contraseñas no coinciden.");
      passwordStrength === "Débil" && setError("La contraseña es débil.");
    }
  };
  const passwordStrength = checkPasswordStrength(newPassword);

  const handleCancelModal = () => {
    setShowModal(false);
    setShowCodeVerificationModal(false);
    setShowChangePasswordModal(false);
  };

  const handleCancel = () => navigate("/login");

  const fetchData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200)
        return await response.json(); // Petición exitosa
      else if (response.status === 400) {
        throw new Error("Solicitud inválida.");
      } else if (response.status === 500) throw new Error("Error de servidor.");
    } catch (err) {
      setError(err.message);
      throw err; // Relanzar para manejar en el catch del llamador
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Establecer loading en true antes de enviar la solicitud
  
    try {
      await fetchData("http://localhost:5000/fb/usuario/password-recovery", {
        email,
      });
      await Swal.fire({ 
        icon: "success",
        title: "Correo Electrónico Enviado",
        html: "Revise el código en su correo electrónico",
        showConfirmButton: true,
      });
      setShowCodeVerificationModal(true);
    } catch (err) {
      // El manejo de errores se realiza dentro de fetchData
    } finally {
      setLoading(false); // Establecer loading en false después de recibir la respuesta
    }
  };
  

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true before making the API request
  
    try {
      // API request to verify the code
      await fetchData("http://localhost:5000/fb/usuario/password-verify", {
        email,
        code: recoveryCode,
      });
  
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Código Confirmado",
        showConfirmButton: false,
        timer: 1500,
      });
  
      // Close code verification modal and show change password modal
      setShowCodeVerificationModal(false);
      setShowChangePasswordModal(true);
    } catch (err) {
      // Show error message if code verification fails
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Código de Verificación Incorrecto",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false); // Set loading back to false after receiving the response
    }
  };
  

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Establecer loading en true antes de enviar la solicitud


    try {
      await fetchData("http://localhost:5000/fb/usuario/password-reset", {
        email,
        code: recoveryCode,
        newPassword,
      });
      setShowChangePasswordModal(false);
      Swal.fire({
        icon: "success",
        title: "Contraseña Cambiada con Éxito",
        text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
        confirmButtonText: "Iniciar Sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Redirigir al usuario al iniciar sesión al hacer clic en "Iniciar Sesión"
        }
      });
    } catch (err) {
      // El manejo de errores se realiza dentro de fetchData
    }finally {
      setLoading(false); // Establecer loading en false después de recibir la respuesta
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div className="password-reset-container" style={{
            fontFamily: 'Montserrat, sans-serif',
            maxWidth: '400px',
            margin: 'auto',
            padding: '40px',
            border: '3px solid #167603',
            borderRadius: '10px',
            backgroundColor: 'rgba(47, 134, 166, 0.4)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            minHeight: '350px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '45px'
          }}>
            <h2 className="password-reset-title" style={{
              fontSize: '28px',
              color: 'white',
              marginBottom: '20px',
              textAlign: 'center'
            }}>Recuperación de Contraseña</h2>
            <p style={{ fontSize: "15px", marginBottom: "10%" , color: 'white', textAlign:'center'}}>
              Por favor, ingrese su correo electrónico para recuperar su contraseña
            </p>
            {error && <p className="password-reset-error">{error}</p>}
            <Form onSubmit={handleSubmitEmail} className="password-reset-form">
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="password-reset-input"
                  required
                />
              </Form.Group>
              <div className="password-reset-buttons" style={{ marginTop: '10px' }}>
              <Button 
  type="submit" 
  className="password-reset-button" 
  style={{ backgroundColor: 'green', borderColor: 'green', marginRight: '5px', position: 'relative' }}
>
  Enviar Código
  {loading && (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Loading />
    </div>
  )}
</Button>

  <Button
    type="button"
    className="password-reset-cancel"
    onClick={handleCancel}
    style={{ backgroundColor: 'red', borderColor: 'red' }}
  >
    Cancelar
  </Button>
</div>
            </Form>
            {showCodeVerificationModal && (
              <ModalPassword handleCancelModal={handleCancelModal} className="custom-modal">
              <div style={{ textAlign: 'center', backgroundColor:'seagreen', padding:'0px'}}>
                <h2 className="modalTitle" style={{ color: 'white' }}>Código de Verificación</h2>
                <p className="modalParagraph" style={{ color: 'white' }}>
                  Por favor, ingrese el código enviado a su correo electrónico
                </p>
                <Form.Control
                  type="text"
                  className="modalInput"
                  onChange={(e) => {
                    setRecoveryCode(e.target.value);
                  }}
                  style={{ backgroundColor: 'white' }}
                />
                <Button onClick={handleVerifyCode} style={{backgroundColor: 'green', border: '2px solid green', borderRadius: '10px'}}>
                  Enviar
                </Button>
              </div>
            </ModalPassword>
            
            
            )}
            {showChangePasswordModal && (
              <ModalPassword handleCancelModal={handleCancelModal} className="custom-modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 className="modalChangePasswordTitle" style={{ color: 'white' }}>Cambio de Contraseña</h2>
                <p className="modalChangePasswordParagraph" style={{ color: 'white' }}>
                  Por favor, ingrese la nueva contraseña
                </p>
                <div className="password-container">
                  <Form.Control
                    className="register-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      handlePasswordBlur(e);
                    }}
                    minLength={6}
                    maxLength={30}
                    required
                  />
                  <Button
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    style={{
                      height: "30px",
                      marginLeft: "1px",
                      borderRadius: "10px",
                      backgroundColor: 'green',
                      border: '2px solid green'
                    }}
                  >
                    👁
                  </Button>
                </div>
                <div className="password-strength-indicator" style={{ fontSize: "15px", marginBottom: "10%", color: 'white' }}>
                  Fuerza de la contraseña: {passwordStrength}
                </div>
            
                <div className="password-container">
                  <Form.Control
                    className="register-input"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Confirme Contraseña"
                    onChange={handlePasswordBlur}
                    required
                  />
                  <Button
                    onClick={() => {
                      setShowPasswordConfirm(!showPasswordConfirm);
                    }}
                    style={{
                      height: "30px",
                      marginLeft: "5px",
                      borderRadius: "10px",
                      backgroundColor: 'green',
                      border: '2px solid green'
                    }}
                  >
                    👁
                  </Button>
                </div>
                {error !== "" && (
                  <p style={{ color: "red", fontSize: "15px" }}>Error: {error}</p>
                )}
                <Button
                  disabled={!validPassword}
                  onClick={handleChangePassword}
                  style={{ backgroundColor: 'green', border: '2px solid green', borderRadius: '10px', marginTop: '10px', color: 'white' }}
                >
                  Cambiar Contraseña
                </Button>
              </div>
            </ModalPassword>            
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );  

}

export default PasswordReset;
