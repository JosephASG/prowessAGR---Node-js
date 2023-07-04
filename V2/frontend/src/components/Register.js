import React, { useState } from 'react';
import './Register.css'; // Importa el archivo de estilos CSS

function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [typeUser, setTypeUser] = useState('');
  const [nPhone, setNPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registro de usuario:', name, lastname, nPhone, password);
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
        <input
        className="register-input"
        type="text"
        placeholder="Apellido"
        value={lastname}
        onChange={(e)=> setLastName(e.target.value)}
        required
        />
        <input
          className="register-input"
          type="genero"
          placeholder="Genero"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Tipo de usuario"
          value={typeUser}
          onChange={(e) => setTypeUser(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Número de telefono"
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
        <button className="register-button" type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
