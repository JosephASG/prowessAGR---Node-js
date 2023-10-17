import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación
import './Register.css'; // Importa el archivo de estilos CSS
import Mapa from './Mapa.js';

const provinces = [
  { "name": "Azuay", "cities": ["Cuenca"] },
  { "name": "Bolívar", "cities": ["Guaranda"] },
  { "name": "Cañar", "cities": ["Azogues"] },
  { "name": "Carchi", "cities": ["Tulcán"] },
  { "name": "Chimborazo", "cities": ["Riobamba"] },
  { "name": "Cotopaxi", "cities": ["Latacunga"] },
  { "name": "El Oro", "cities": ["Machala"] },
  { "name": "Esmeraldas", "cities": ["Esmeraldas"] },
  { "name": "Galápagos", "cities": ["Puerto Baquerizo Moreno"] },
  { "name": "Guayas", "cities": ["Guayaquil"] },
  { "name": "Imbabura", "cities": ["Ibarra"] },
  { "name": "Loja", "cities": ["Loja"] },
  { "name": "Los Ríos", "cities": ["Babahoyo"] },
  { "name": "Manabí", "cities": ["Portoviejo"] },
  { "name": "Morona Santiago", "cities": ["Macas"] },
  { "name": "Napo", "cities": ["Tena"] },
  { "name": "Orellana", "cities": ["Francisco de Orellana"] },
  { "name": "Pastaza", "cities": ["Puyo"] },
  { "name": "Pichincha", "cities": ["Quito"] },
  { "name": "Santa Elena", "cities": ["Santa Elena"] },
  { "name": "Santo Domingo de los Tsáchilas", "cities": ["Santo Domingo"] },
  { "name": "Sucumbíos", "cities": ["Nueva Loja"] },
  { "name": "Tungurahua", "cities": ["Ambato", "Pelileo", "Cevallos"] },
  { "name": "Zamora Chinchipe", "cities": ["Zamora"] }
];

function Register() {
  const [name, setName] = useState('');
  const [name2, setName2] = useState('');
  const [lastName, setlastName] = useState('');
  const [lastName2, setlastName2] = useState('');
  const [email, setEmail] = useState(''); 
  const [userType, setUserType] = useState('');
  const [nPhone, setNPhone] = useState('');
  const [nCedula, setNCedula] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [latitud,setLatitud] = useState(0);
  const [altitud,setAltitud] = useState(0);
  const [mainStreet, setMainStreet] = useState('');
  const [secondaryStreet, setSecondaryStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [additionalField1, setAdditionalField1] = useState(''); // Campo adicional 1

  const navigate = useNavigate();

  const handleRegister = (e) => {
    var image = photo.get('user-image');
    e.preventDefault();
    console.log('Registro de usuario:', name, userType, nPhone, nCedula ,password, photo, province, city, mainStreet, secondaryStreet, postalCode);
    const formData = new FormData();
    formData.append("nombreUsuario", name);
    formData.append("apellidoUsuario", lastName);
    formData.append("nombreUsuarioS", name2);
    formData.append("apellidoUsuarioS", lastName2);
    formData.append("cedulaUsuario", nCedula);
    formData.append("direccionUsuario", province + ' ' + city + ' ' + mainStreet + ' ' + secondaryStreet + ' ' + postalCode);
    formData.append("telefonoUsuario", nPhone);
    formData.append("correoUsuario", email);
    formData.append("latitudUsuario",latitud);
    formData.append("altitudUsuario",altitud);
    formData.append("categoriaUsuario", showAdditionalFields ? 'vendedor' : 'cliente');
    formData.append("tipoAsociacionUsuario", additionalField1);
    formData.append("claveUsuario", password);
    formData.append("imagenUsuario", image);
    //TODO: AGREGAR UBICACION CORRECTAMENTE

    fetch('http://localhost:5000/fb/usuario/register', {
      method: "POST",
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          console.log('Usuario agregado correctamente');
          navigate('/login');
        } else {
          console.error('Error al agregar el proveedor en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al agregar el proveedor', error);
      });
  };
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("user-image", file);
    setPhoto(formData);
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
        <div className="register-container-2">
        <input
          className="register-input"
          type="text"
          placeholder="Primer Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
          <input
          className="register-input"
          type="text"
          placeholder="Segundo Nombre"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          required
        />
        </div>
        <div className="register-container-2">
        <input
          className="register-input"
          type="text"
          placeholder="Primer Apellido"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          required
        />
          <input
          className="register-input"
          type="text"
          placeholder="Segundo Apellido"
          value={lastName2}
          onChange={(e) => setlastName2(e.target.value)}
          required
        />
        </div>
        <input
          className="register-input"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Número de Cedula - Pasaporte"
          value={nCedula}
          onChange={(e) => setNCedula(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Número de Teléfono"
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
          name="user-image"
          onChange={handlePhotoUpload}
        />
        {//TODO: Arreglar vista de Foto de perfil
        }

        {photo && <img src={photo} alt="Foto de perfil" className='image-show'/>}
        <h3 className="register-subtitle">Ubicación</h3>
        <Mapa>
        </Mapa>
        <h3 className="register-subtitle">Dirección</h3>
        <select
          className="register-inputS"
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
          className="register-inputS"
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
        <input
          type="checkbox"
          onChange={() => setShowAdditionalFields(!showAdditionalFields)}
        />
        <label>Deseo ser vendedor</label>
        {showAdditionalFields && (
          <div>
            <input
              className="register-input"
              type="text"
              placeholder="tipo Asosiacion"
              value={additionalField1}
              onChange={(e) => setAdditionalField1(e.target.value)}
              required
            />
          </div>
        )}
        <button className="register-button" type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;