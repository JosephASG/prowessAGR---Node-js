import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RecuperarCuenta.css';
import { recuperarCuenta } from '../services/auth';

const RecuperarCuenta = () => {
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const backupPhoneFromQuery = queryParams.get('backupPhone');
  const isLoginPage = pathname === '/login'; // Ajusta la ruta según tu aplicación

  const [backupPhoneNumber, setBackupPhoneNumber] = useState(
    isLoginPage ? '' : backupPhoneFromQuery || ''
  );
  const [alternativeEmail, setAlternativeEmail] = useState('');
  const [recoveryCodeSent, setRecoveryCodeSent] = useState(false);

  const handleRecuperarCuenta = async (e) => {
    e.preventDefault();

    try {
      // Llama a la función recuperarCuenta modificada
      const result = await recuperarCuenta(alternativeEmail, backupPhoneNumber);

      if (result.success) {
        console.log('Código de recuperación enviado correctamente.');
        setRecoveryCodeSent(true);
      } else {
        console.log('La recuperación de cuenta falló.');
        // Muestra un mensaje de error al usuario si lo deseas
      }
    } catch (error) {
      console.error('Error al intentar recuperar la cuenta:', error);
      // Muestra un mensaje de error al usuario si lo deseas
    }
  };

  return (
    <div className={`recuperar-cuenta-container${isLoginPage ? ' login-page' : ''}`}>
      <h2 className="recuperar-cuenta-title">Recuperar Cuenta</h2>
      <form onSubmit={handleRecuperarCuenta}>
        {/* Renderiza el campo de número de teléfono solo si no estás en la página de inicio de sesión */}
        {!isLoginPage && (
          <input
            className="recuperar-cuenta-input"
            type="tel"
            placeholder="Número de teléfono de respaldo"
            value={backupPhoneNumber}
            onChange={(e) => setBackupPhoneNumber(e.target.value)}
            required
          />
        )}
        <input
          className="recuperar-cuenta-input"
          type="email"
          placeholder="Correo electrónico alternativo"
          value={alternativeEmail}
          onChange={(e) => setAlternativeEmail(e.target.value)}
          required
        />
        <button className="recuperar-cuenta-button" type="submit">
          Recuperar Cuenta
        </button>
      </form>
      {recoveryCodeSent && (
        <p>Código de recuperación enviado correctamente. Por favor, revisa tu correo electrónico o número de teléfono.</p>
      )}
    </div>
  );
};

export default RecuperarCuenta;