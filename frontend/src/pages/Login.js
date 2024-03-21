import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginApp } from '../services/auth';
//Llamado a librería para alertar (SweetAlert)
import Swal from 'sweetalert2';
const WEBURL = process.env.REACT_APP_API_URL;

function Login(props) {
  const { setIsLoggedIn, setToken } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Cambiamos a "message"

  const navigate = useNavigate();

  const login = async (user) => {
    const res = await loginApp(JSON.stringify(user));
    const data = res.data;
    if (data && data.estado === true) {
      setToken(data.usuario.token);
      setMessage(data.mensaje);

      // Mostrar alerta de inicio de sesión exitoso con SweetAlert
      await Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: true,
      });
      console.log("Entrando")
      localStorage.setItem("token", data.usuario.token);
      navigate('/mi-cuenta');
      setIsLoggedIn(true);
    } else {
      setMessage(res.response.data.message)
      console.log('Usuario no logueado', res.response.data.message);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    await login(formData);
  };


  const manejarRecuperacionContrasena = () => {
    navigate('/recuperar-contrasena');
  };

  const manejarRecuperacionCuenta = () => {
    navigate('/recuperar-cuenta');
  };




  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button className="login-button" type="submit">Iniciar sesión</button>
      </form>
      <div className="login-register-button">
        <button className="login-button" onClick={() => navigate('/registro')}>
          Registrarse
        </button>
      </div>
      <div className="login-message">
        <p><center>¿Necesitas ayuda con tu cuenta o contraseña?
          <a href="#" onClick={manejarRecuperacionCuenta}>Recuperar cuenta</a>
          /
          <a href="#" onClick={manejarRecuperacionContrasena}>Recuperar contraseña</a>
        </center>
        </p>
      </div>
      <div >
        {message}
      </div>
    </div>
  );
}

export default Login;