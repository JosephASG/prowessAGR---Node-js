import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
       navigate('/password-send');
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="password-reset-container">
      <h2 className="password-reset-title">Recuperación de Contraseña</h2>
      <h3 className="password-reset-subtitle">¿Olvidaste tu contraseña? No te preocupes</h3>
      <h4 className="password-reset-subtitle">Puedes restablecerla ingresando el correo electrónico que registraste al crear tu cuenta en Prowess Agrícola</h4>
      <form onSubmit={handleSubmit} className="password-reset-form">
        <div className="password-reset-option">
          <input
            type="email"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="password-reset-input"
            required
            size="20"
          />
        </div>
        <div className="password-reset-buttons">
          <button type="submit" className="password-reset-button">Restablecer contraseña</button>
          <button type="button" className="password-reset-cancel" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;