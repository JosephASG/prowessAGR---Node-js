import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Importa el archivo de estilos CSS
import Mapa from '../components/Mapa.js';
import { registerApp } from '../services/auth';
const WEBURL = process.env.REACT_APP_API_URL
const provinces = [
  { "name": "Azuay", "cities": ["Cuenca"] },
  { "name": "Bolívar", "cities": ["Guaranda"] },
  { "name": "Cañar", "cities": ["Azogues"] },
  { "name": "Carchi", "cities": ["Tulcán"] },
  { "name": "Chimborazo", "cities": ["Riobamba"] },
  { "name": "Cotopaxi", "cities": ["L atacunga"] },
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

const validarCedulaEcuatoriana = (cedula) => {
  if (cedula.length === 10 && /^[0-9]+$/.test(cedula)) {
    // Validación de cédula ecuatoriana
    var digitos = cedula.substr(0, 9);
    var suma = 0;

    for (var i = 0; i < digitos.length; i++) {
      var digito = parseInt(digitos[i]);
      if (i % 2 === 0) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
      suma += digito;
    }

    var verificador = 10 - (suma % 10);
    if (verificador === 10) {
      verificador = 0;
    }

    var ultimoDigito = parseInt(cedula[9]);

    return verificador === ultimoDigito;
  } else if ((cedula.length === 8 || cedula.length === 9) && /^[A-Z0-9]+$/.test(cedula)) {
    // Validación de pasaporte ecuatoriano
    return true; // Pasaporte válido
  } else {
    // No es ni cédula ecuatoriana ni pasaporte ecuatoriano
    return false;
  }
};


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
  const [validPassword, setValidPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [latitud, setLatitud] = useState('');
  const [altitud, setAltitud] = useState('');
  const [mainStreet, setMainStreet] = useState('');
  const [secondaryStreet, setSecondaryStreet] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [additionalField1, setAdditionalField1] = useState('');
  const [isCedulaValid, setIsCedulaValid] = useState(true);
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [confirmationStatus, setConfirmationStatus] = useState(false);

  const navigate = useNavigate();

  const handleLocationSelect = (latlng) => {
    setLatitud(latlng.lat);
    setAltitud(latlng.lng);
  };
  console.log(latitud, altitud)
  const validateField = (fieldName, value) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (!/^[A-Za-z\s]+$/.test(value) && value !== '') {
          errorMessage = '¡Recuerde que debe ser un nombre válido!';
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };


  
  const handleCedulaBlur = (e) => {
    const value = e.target.value;
    let longitudValida;
    let formatoValido;

    if (tipoDocumento === 'cedula' || tipoDocumento === 'pasaporte') {
      longitudValida = value.length === 10;
      formatoValido = /^[0-9]+$/.test(value);
    } else if (tipoDocumento === 'ruc') {
      longitudValida = value.length === 13;
      formatoValido = /^[0-9]+$/.test(value);
    }

    if (longitudValida && formatoValido) {
      setIsCedulaValid(true);
    } else {
      setIsCedulaValid(false);
    }
  };

  const handleTipoDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
    setNCedula(''); // Reiniciar el valor de la cédula cuando cambia el tipo de documento
  };

  const handlePasswordBlur = (e) => {
    const confirmPasswordValue = e.target.value;
    if (password !== confirmPasswordValue) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }

  const handleRegister = async (e) => {
    var image = photo.get('user-image');
    e.preventDefault();
    console.log('Registro de usuario:', name, userType, nPhone, nCedula, password, photo, province, city, mainStreet, secondaryStreet);
    const formData = new FormData();
    formData.append("nombreUsuario", name);
    formData.append("apellidoUsuario", lastName);
    formData.append("nombreUsuarioS", name2);
    formData.append("apellidoUsuarioS", lastName2);
    formData.append("cedulaUsuario", nCedula);
    formData.append("direccionUsuario", province + ' ' + city + ' ' + mainStreet + ' ' + secondaryStreet);
    formData.append("ciudadUsuario", city);
    formData.append("provinciaUsuario", province);
    formData.append("telefonoUsuario", nPhone);
    formData.append("correoUsuario", email);
    formData.append("latitudUsuario", latitud);
    formData.append("altitudUsuario", altitud);
    formData.append("categoriaUsuario", showAdditionalFields ? 'vendedor' : 'cliente');
    formData.append("tipoAsociacionUsuario", additionalField1);
    formData.append("claveUsuario", password);
    formData.append("imagenUsuario", image);

    const areNamesFilled = name.trim() !== '' && name2.trim() !== '';

    const isValidCedula = validarCedulaEcuatoriana(nCedula);

    const isDataConfirmed = areNamesFilled;

    setConfirmationStatus(isDataConfirmed);

    const response = await registerApp(formData);
    console.log(response);
    if (response.status === 201) {
      navigate(`/login`);
    }
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
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]+$/.test(value) || value === '') {
                setName(value);
              }
            }}
            required
          />
          <input
            className="register-input"
            type="text"
            placeholder="Segundo Nombre"
            value={name2}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]+$/.test(value) || value === '') {
                setName2(value);
              }
            }}
            required
          />
        </div>
        <div className="register-container-2">
          <input
            className="register-input"
            type="text"
            placeholder="Primer Apellido"
            value={lastName}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]+$/.test(value) || value === '') {
                setlastName(value);
              }
            }}
            required
          />
          <input
            className="register-input"
            type="text"
            placeholder="Segundo Apellido"
            value={lastName2}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]+$/.test(value) || value === '') {
                setlastName2(value);
              }
            }}
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

        <select
          className="register-inputS"
          value={tipoDocumento}
          onChange={handleTipoDocumentoChange}
          required
        >
          <option value="">
            Tipo de documento
          </option>
          <option value="cedula">Cédula</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="ruc">RUC</option>
        </select>


        {tipoDocumento && (
          <input
            className={`register-input ${isCedulaValid ? '' : 'invalid-cedula'}`}
            type="text"
            placeholder={`Número de ${tipoDocumento === 'cedula'
              ? 'Cédula'
              : tipoDocumento === 'pasaporte'
                ? 'Pasaporte'
                : 'RUC'
              }`}
            maxLength={tipoDocumento === 'ruc' ? 13 : 10}
            value={nCedula}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9\s]+$/.test(value) || value === '') {
                setNCedula(value);
              }
            }}
            onBlur={handleCedulaBlur}
            required
          />
        )}
        {isCedulaValid ? null : <p className="error-message">¡Recuerde que debe ser un documento real!</p>}

        <input
          className="register-input"
          type="text"
          placeholder="Número de Teléfono"
          value={nPhone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[0-9\s]+$/.test(value) || value === '') {
              setNPhone(value);
            }
          }}
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
          type="password"
          placeholder="Confirme Contraseña"
          onBlur={handlePasswordBlur}
        />
        {validPassword && (
          <p className="error-message">Las contraseñas no coinciden</p>
        )}

        <div className="custom-file-input-container">

          <input
            className="register-input  register-input-image"
            type="file"
            accept="image/*"
            name="user-image"
            title="Selecciona una imagen de perfil"
            onChange={handlePhotoUpload}
          />
          <span className="custom-file-input-label">Subir Imagen de Perfil</span>

          {photo && (
            <div>
              <img src={URL.createObjectURL(photo.get('user-image'))} alt="Foto de perfil" className="image-show" />
            </div>
          )}

        </div>
        <h3 className="register-subtitle">Ubicación</h3>
        <Mapa onLocationSelect={handleLocationSelect} />

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
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-z\s]+$/.test(value) || value === '') {
              setMainStreet(value);
            }
          }}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Calle Secundaria"
          value={secondaryStreet}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-z\s]+$/.test(value) || value === '') {
              setSecondaryStreet(value);
            }
          }}
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
              placeholder="Tipo de Asosiacion"
              value={additionalField1}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z]+$/.test(value) || value === '') {
                  setAdditionalField1(value);
                }
              }}
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