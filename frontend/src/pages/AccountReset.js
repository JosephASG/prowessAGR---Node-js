import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountReset.css';

function AccountReset() {
    const [cedula, setCedula] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar la cédula y procesarla
        navigate('/password-send');
    };
  
    const handleCancel = () => {
        navigate('/login');
    };
  
    return (
        <div className="cuenta-reset-container">
            <h2 className="cuenta-reset-title">Recuperación de Cuenta</h2>
            <h3 className="cuenta-reset-subtitle-2">¿Olvidaste tu cuenta? <br></br>No te preocupes.</h3>
            <h4 className="cuenta-reset-subtitle">Ingresa a continuación tu número de cédula</h4>
            <form onSubmit={handleSubmit} className="cuenta-reset-form">
                <div className="cuenta-reset-option">
                    <input
                        type="text"
                        id="cedulaInput"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        className="cuenta-reset-input"
                        required
                        size="20"
                    />
                </div>
                <div className="cuenta-reset-buttons">
                    <button type="submit" className="cuenta-reset-button">Recuperar Usuarios</button>
                    <button type="button" className="cuenta-reset-cancel" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default AccountReset;
