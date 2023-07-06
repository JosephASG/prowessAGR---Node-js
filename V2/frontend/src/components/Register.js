import React, { useState } from 'react';
import './Register.css'; // Importa el archivo de estilos CSS

const provinces = [
  { name: 'Tungurahua', cities: ['Ambato', 'Pelileo', 'Cevallos'] },
  { name: 'Pichincha', cities: ['Quito', 'Machachi', 'Cayambe'] },
  { name: 'Provincia 3', cities: ['Ciudad 7', 'Ciudad 8', 'Ciudad 9'] },
  // Agrega más provincias y ciudades según tus necesidades
];

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

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    setCity('');
  };

  const getCityOptions = () => {
    const selectedProvinceObj = provinces.find((p) => p.name === province);
    if (selectedProvinceObj) {
      return selectedProvinceObj.cities.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ));
    }
    return null;
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
        <select
          className="register-input"
          value={province}
          onChange={handleProvinceChange}
          required
        >
          <option value="">Seleccionar provincia</option>
          {provinces.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className="register-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option value="">Seleccionar ciudad</option>
          {getCityOptions()}
        </select>
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
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <button className="register-button" type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
