import React, { useState } from 'react';
import './Login.css'; // Importa el archivo de estilos CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Inicio de sesión:', email, password);
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
    </div>
  );
}

export default Login;
