import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginApp } from "../services/auth";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
const WEBURL = process.env.REACT_APP_API_URL;

function Login(props) {
  const { setIsLoggedIn, setToken } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const login = async (user) => {
    const res = await loginApp(JSON.stringify(user));
    const data = res.data;
    if (data && data.estado === true) {
      setToken(data.usuario.token);
      setMessage(data.mensaje);

      await Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: true,
      });
      console.log("Entrando");
      localStorage.setItem("token", data.usuario.token);
      navigate("/mi-cuenta");
      setIsLoggedIn(true);
    } else {
      setMessage(res.response.data.message);
      console.log("Usuario no logueado", res.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    await login(formData);
  };

  const manejarRecuperacionContrasena = () => {
    navigate("/recuperar-contrasena");
  };

  const manejarRecuperacionCuenta = () => {
    navigate("/recuperar-cuenta");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="loginForm">
        <input
          className="login-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="login-register-buttons">
          <Button type="submit" variant="success">
            Iniciar Sesión
          </Button>
          <Button variant="light" onClick={() => navigate("/registro")}>
            Registrarse
          </Button>
        </div>
      </form>

      <div className="login-message">
        <p className="breadcrumb">
          <center>
            ¿Necesitas ayuda con tu cuenta o contraseña?
            <a href="#" onClick={manejarRecuperacionCuenta}>
              Recuperar cuenta
            </a>{" "}
            /{" "}
            <a href="#" onClick={manejarRecuperacionContrasena}>
              Recuperar contraseña
            </a>
          </center>
        </p>
      </div>
      <div>{message}</div>
    </div>
  );
}

export default Login;
