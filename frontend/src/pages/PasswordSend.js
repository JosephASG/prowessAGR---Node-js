import React from 'react';
import './PasswordSend.css';

function PasswordSend() {
  return (
    <div className="password-send-container">
      <h2 className="password-send-title">Correo electrónico de restablecimiento de contraseña enviado</h2>
      <p className="password-send-message">
        Se ha enviado un correo electrónico de restablecimiento de contraseña a la dirección de correo electrónico de tu cuenta,
        pero puede llevar varios minutos que aparezca en tu bandeja de entrada. Por favor, espera al menos 10 minutos antes de intentar otro restablecimiento.
      </p>
    </div>
  );
}

export default PasswordSend;
