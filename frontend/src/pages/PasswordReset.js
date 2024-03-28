import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordReset.css";
import ModalPassword from "../components/ModalPassword";
import Swal from "sweetalert2";

function PasswordReset() {
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await fetchData("http://localhost:5000/fb/usuario/password-verify", {
        email,
        code: recoveryCode,
      });
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Código Confirmado",
        showConfirmButton: false,
        timer: 1500, // Tiempo en milisegundos (en este caso, 1.5 segundos)
      });
      setShowCodeVerificationModal(false);
      setShowChangePasswordModal(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Código de Verificación Incorrecto",
        showConfirmButton: false,
        timer: 1500, // Tiempo en milisegundos (en este caso, 1.5 segundos)
      });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");

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
    }
  };

  return (
    <div className="password-reset-container">
      <h2 className="password-reset-title">Recuperación de Contraseña</h2>
      <p style={{ fontSize: "15px", marginBottom: "10%" }}>
        Por favor, ingrese su correo electrónico para recuperar su contraseña
      </p>
      {error && <p className="password-reset-error">{error}</p>}
      <form onSubmit={handleSubmitEmail} className="password-reset-form">
        <input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="password-reset-input"
          required
        />
        <div className="password-reset-buttons">
          <button type="submit" className="password-reset-button">
            Enviar Código
          </button>
          <button
            type="button"
            className="password-reset-cancel"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
      {showCodeVerificationModal && (
        <ModalPassword handleCancelModal={handleCancelModal}>
          <h2 className="modalTitle">Código de Verificación</h2>
          <p className="modalParagraph">
            Por favor, ingrese el código enviado a su correo electrónico
          </p>
          <input
            type="text"
            className="modalInput"
            onChange={(e) => {
              setRecoveryCode(e.target.value);
            }}
          />
          <button className="modalButton" onClick={handleVerifyCode}>
            Enviar
          </button>
        </ModalPassword>
      )}
      {showChangePasswordModal && (
        <ModalPassword handleCancelModal={handleCancelModal}>
          <h2 className="modalChangePasswordTitle">Cambio de Contraseña</h2>
          <p className="modalChangePasswordParagraph">
            Por favor, ingrese la nueva contraseña
          </p>
          <div className="password-container">
            <input
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
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              style={{
                height: "30px", // Establecer la altura del botón igual a la altura del input
                marginLeft: "5px",
                borderRadius: "10px", // Agregar un margen izquierdo para separar el botón del input
              }}
            >
              👁
            </button>
          </div>
          <div className="password-strength-indicator">
            Fuerza de la contraseña: {passwordStrength}
          </div>

          <div className="password-container">
            <input
              className="register-input"
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="Confirme Contraseña"
              onChange={handlePasswordBlur}
              required
            />
            <button
              onClick={() => {
                setShowPasswordConfirm(!showPasswordConfirm);
              }}
              style={{
                height: "30px", // Establecer la altura del botón igual a la altura del input
                marginLeft: "5px",
                borderRadius: "10px", // Agregar un margen izquierdo para separar el botón del input
              }}
            >
              👁
            </button>
          </div>
          {error !== "" && (
            <p style={{ color: "red", fontSize: "15px" }}>Error: {error}</p>
          )}
          <button
            disabled={!validPassword}
            className="modalButton"
            onClick={handleChangePassword}
          >
            Cambiar Contraseña
          </button>
        </ModalPassword>
      )}
    </div>
  );
}

export default PasswordReset;
