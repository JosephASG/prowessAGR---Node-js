import React, { useState } from 'react';
import './Register.css'; // Importa el archivo de estilos CSS

function Register() {
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [nPhone, setNPhone] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [mainStreet, setMainStreet] = useState('');
  const [secondaryStreet, setSecondaryStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registro de usuario:', name, userType, nPhone, password, photo, province, city, mainStreet, secondaryStreet, postalCode);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro de usuarios</h2>
      <form onSubmit={handleRegister}>
        <input
          className="register-input"
          type="text"
          placeholder="Nombres"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="register-input"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="">Seleccionar tipo de usuario</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Cliente">Cliente</option>
        </select>
        <input
          className="register-input"
          type="text"
          placeholder="Número de teléfono"
          value={nPhone}
          onChange={(e) => setNPhone(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
        />
        {photo && <img src={photo} alt="Foto de perfil" />}
        <h3 className="register-subtitle">Dirección</h3>
        <input
          className="register-input"
          type="text"
          placeholder="Provincia"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Calle Principal"
          value={mainStreet}
          onChange={(e) => setMainStreet(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Calle Secundaria"
          value={secondaryStreet}
          onChange={(e) => setSecondaryStreet(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Código Postal"
          value={postalCode}
          required
        />
        <button className="register-button" type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
