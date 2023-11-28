// RecuperarContraseña.js

import React, { useState } from 'react';

const RecuperarContraseña = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecuperarContraseña = async () => {
    try {
      const res = await fetch(`${WEBURL}fb/usuario/recuperar-contrasena`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Correo electrónico de restablecimiento de contraseña enviado.');
      } else {
        setMessage('El restablecimiento de contraseña falló.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRecuperarContraseña();
  };

  return (
    <div>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar Solicitud</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RecuperarContraseña;