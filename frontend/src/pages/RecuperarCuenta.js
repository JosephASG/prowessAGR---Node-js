import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RecuperarCuenta.css'; // Asegúrate de tener un archivo CSS asociado

const RecuperarCuenta = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const backupPhoneFromQuery = queryParams.get('backupPhone');
  const [backupPhoneNumber, setBackupPhoneNumber] = useState(backupPhoneFromQuery || '');

  const handleRecuperarCuenta = async () => {
    // Aquí deberías implementar la lógica para enviar el código de recuperación
    // al correo electrónico y/o número de teléfono de respaldo.
    // Puedes utilizar una función similar a la de recuperarCuenta en Login.js.

    console.log('Recuperar cuenta con número de teléfono de respaldo:', backupPhoneNumber);
  };

  return (
    <div className="recuperar-cuenta-container">
      <h2 className="recuperar-cuenta-title">Recuperar Cuenta</h2>
      <form onSubmit={handleRecuperarCuenta}>
        {/* Otros campos y elementos del formulario, si es necesario */}
        <input
          className="recuperar-cuenta-input"
          type="tel"
          placeholder="Número de teléfono de respaldo"
          value={backupPhoneNumber}
          onChange={(e) => setBackupPhoneNumber(e.target.value)}
          required
        />
        <button className="recuperar-cuenta-button" type="submit">Recuperar Cuenta</button>
      </form>
    </div>
  );
};

export default RecuperarCuenta;