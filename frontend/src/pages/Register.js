import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Importa el archivo de estilos CSS
import Mapa from "../components/Mapa.js";
import Swal from "sweetalert2";
import { registerApp } from "../services/auth";
import { getUsers } from "../services/user";
import { provincesApi } from "../services/ubication";

const validarCedulaEcuatoriana = (cedula) => {
  if (cedula.length === 10 && /^[0-9]+$/.test(cedula)) {
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
  } else if (
    (cedula.length === 8 || cedula.length === 9) &&
    /^[A-Z0-9]+$/.test(cedula)
  ) {
    return true;
  } else {
    return false;
  }
};

function Register() {
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [lastName, setlastName] = useState("");
  const [lastName2, setlastName2] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [nPhone, setNPhone] = useState("");
  const [nCedula, setNCedula] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [latitud, setLatitud] = useState("");
  const [altitud, setAltitud] = useState("");
  const [mainStreet, setMainStreet] = useState("");
  const [secondaryStreet, setSecondaryStreet] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [additionalField1, setAdditionalField1] = useState("");
  const [isCedulaValid, setIsCedulaValid] = useState(true);
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmailExistsMessage, setShowEmailExistsMessage] = useState(false);
  const [showFullErrorMessage, setShowFullErrorMessage] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await provincesApi();
        const data = response.data.message;
        const extractedProvinces = Object.keys(data).map((key) => {
          const provinceData = data[key];
          const cantones = Object.keys(provinceData.cantones).map(
            (cantonKey) => {
              return provinceData.cantones[cantonKey].canton;
            }
          );

          return {
            name: provinceData.provincia,
            cities: cantones,
          };
        });

        setProvinces(extractedProvinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchData();
  }, []);

  const handleLocationSelect = (latlng) => {
    setLatitud(latlng.lat);
    setAltitud(latlng.lng);
  };

  const handleCedulaBlur = (e) => {
    const value = e.target.value;

    let longitudValida;
    let formatoValido;

    if (tipoDocumento === "cedula") {
      longitudValida = value.length === 10;
      formatoValido = /^[0-9]+$/.test(value);

      if (longitudValida && formatoValido) {
        const isCedulaValid = validarCedulaEcuatoriana(value);
        setIsCedulaValid(isCedulaValid);
      } else {
        setIsCedulaValid(false);
      }
    } else if (tipoDocumento === "ruc") {
      const primerosDiezDigitos = value.substring(0, 10);
      const isPrimerosDiezDigitosValidos =
        validarCedulaEcuatoriana(primerosDiezDigitos);

      const ultimosTresDigitos = value.substring(10);
      const isUltimosTresDigitosValidos = ultimosTresDigitos === "001";

      setIsCedulaValid(
        isPrimerosDiezDigitosValidos && isUltimosTresDigitosValidos
      );
    } else if (tipoDocumento === "pasaporte") {
      //No existe logica para validar pasaporte ya que no tiene un formato definido
      setIsCedulaValid(true);
    }
  };
  const checkPasswordStrength = (password) => {
    // Evaluar la longitud de la contraseña
    if (password.length < 6) {
      return "Débil"; // Contraseña demasiado corta
    }

    // Evaluar la complejidad de la contraseña
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    // Determinar la fuerza de la contraseña en función de la complejidad
    if (hasNumber && hasSpecialChar && hasUpperCase && hasLowerCase) {
      return "Muy alta"; // Todos los criterios cumplidos
    } else if (
      (hasNumber && hasUpperCase) ||
      (hasNumber && hasSpecialChar) ||
      (hasUpperCase && hasSpecialChar)
    ) {
      return "Alta"; // Cumple con dos de los criterios
    } else if (hasNumber || hasSpecialChar || hasUpperCase || hasLowerCase) {
      return "Media"; // Cumple con uno de los criterios
    } else {
      return "Débil"; // No cumple con ninguno de los criterios
    }
  };
  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailExists(false);

    try {
      const response = await getUsers();
      const users = response.data;
      const emailExists = users.some((user) => user.correoUsuario === newEmail);

      setEmailExists(emailExists);
      setErrorMessage("");

      setShowEmailExistsMessage(emailExists);
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);

      if (error.response && error.response.status === 404) {
        setErrorMessage("El correo electrónico ya está registrado");
      } else {
        setErrorMessage("Error al verificar el correo electrónico");
      }
    }
  };

  const handleEmailValidation = (e) => {
    const email = e.target.value;
    const emailRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    const isValidEmail = emailRegex.test(email);

    setIsValidEmail(isValidEmail);
  };

  const isFormValid = () => {
    const requiredFields = [
      name,
      name2,
      lastName,
      lastName2,
      email,
      nPhone,
      nCedula,
      password,
      province,
      city,
      mainStreet,
      secondaryStreet,
      photo,
    ];
    const hasEmptyFields = requiredFields.some((field) => field === "");
    const isCedulaOrRucValid =
      tipoDocumento === "ruc"
        ? validarCedulaEcuatoriana(nCedula)
        : validarCedulaEcuatoriana(nCedula) || true; // Agrega la lógica para validar RUC
    const arePasswordsValid = !validPassword; // La validación ahora se basa en el estado validPassword

    return (
      !hasEmptyFields &&
      isCedulaOrRucValid &&
      arePasswordsValid &&
      photo !== null &&
      isTermsAccepted
    );
  };

  const handleTipoDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
    setNCedula("");
  };

  const handlePasswordBlur = (e) => {
    const confirmPasswordValue = e.target.value;
    if (password !== confirmPasswordValue) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(
      "Registro de usuario:",
      name,
      userType,
      nPhone,
      nCedula,
      password,
      photo,
      province,
      city,
      mainStreet,
      secondaryStreet
    );
    const formData = new FormData();
    formData.append("nombreUsuario", name);
    formData.append("apellidoUsuario", lastName);
    formData.append("nombreUsuarioS", name2);
    formData.append("apellidoUsuarioS", lastName2);
    formData.append("cedulaUsuario", nCedula);
    formData.append(
      "direccionUsuario",
      province + " " + city + " " + mainStreet + " " + secondaryStreet
    );
    formData.append("ciudadUsuario", city);
    formData.append("provinciaUsuario", province);
    formData.append("telefonoUsuario", nPhone);
    formData.append("correoUsuario", email);
    formData.append("latitudUsuario", latitud);
    formData.append("altitudUsuario", altitud);
    formData.append(
      "categoriaUsuario",
      showAdditionalFields ? "vendedor" : "cliente"
    );
    formData.append("tipoAsociacionUsuario", additionalField1);
    formData.append("claveUsuario", password);
    formData.append("imagenUsuario", photo);

    try {
      const response = await registerApp(formData);

      await Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        showConfirmButton: true,
      });

      if (response && response.status === 201) {
        navigate(`/login`);
      } else {
        console.error("Error al registrar el usuario:", response);
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Correo registrado"
      ) {
        setShowFullErrorMessage(true);
      }
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);

      const img = new Image();
      img.src = imgURL;
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width <= 150 && height <= 150) {
          setPhoto(file);
        } else {
          alert("La imagen debe tener un tamaño máximo de 150px por 150px.");
          e.target.value = "";
        }

        URL.revokeObjectURL(imgURL);
      };
    }
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    setCity("");
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

  const passwordStrength = checkPasswordStrength(password);
  const [showPopup, setShowPopup] = useState(false);

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
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value) || value === "") {
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
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value) || value === "") {
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
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value) || value === "") {
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
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value) || value === "") {
                setlastName2(value);
              }
            }}
            required
          />
        </div>
        <input
          className="register-input"
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailValidation}
          required
        />
        {showEmailExistsMessage && (
          <div className="email-exists-message">
            <p>¡El correo electrónico ya está registrado!</p>
          </div>
        )}

        <p className="register-document">Tipo de documento:</p>
        <select
          className="register-inputS"
          value={tipoDocumento}
          onChange={handleTipoDocumentoChange}
          required
        >
          <option value="select">Selecciona</option>
          <option value="cedula">Cédula</option>
          <option value="ruc">RUC</option>
          <option value="pasaporte">Pasaporte</option>
        </select>

        {tipoDocumento && (
          <input
            className={`register-input ${
              isCedulaValid ? "" : "invalid-cedula"
            }`}
            type="text"
            placeholder={`Número de ${
              tipoDocumento === "cedula"
                ? "Cédula"
                : tipoDocumento === "pasaporte"
                ? "Pasaporte"
                : "RUC"
            }`}
            maxLength={tipoDocumento === "ruc" ? 13 : 10}
            value={nCedula}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9\s]+$/.test(value) || value === "") {
                setNCedula(value);
              }
            }}
            onBlur={handleCedulaBlur}
            required
          />
        )}
        {isCedulaValid ? null : (
          <p className="error-message">
            ¡Recuerde que debe ser un documento real!
          </p>
        )}

        <input
          className="register-input"
          type="text"
          placeholder="Número de Teléfono"
          value={nPhone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[0-9\s]+$/.test(value) || value === "") {
              setNPhone(value);
            }
          }}
          required
        />
        <div className="password-container">
          <input
            className="register-input"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            maxLength={30}
            required
          />
          <span
            className={`password-toggle ${showPassword ? "visible" : ""}`}
            onClick={togglePasswordVisibility}
          >
            👁️‍🗨️
          </span>
        </div>
        <div className="password-strength-indicator">
          Fuerza de la contraseña: {passwordStrength}
        </div>

        <div className="password-container">
          <input
            className="register-input"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme Contraseña"
            onBlur={handlePasswordBlur}
            required
          />
          <span
            className={`password-toggle ${
              showConfirmPassword ? "visible" : ""
            }`}
            onClick={toggleConfirmPasswordVisibility}
          >
            👁️‍🗨️
          </span>
        </div>
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
            required
          />
          <span className="custom-file-input-label">
            Subir Imagen de Perfil
          </span>

          {photo && (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="Foto de perfil"
                className="image-show"
              />
            </div>
          )}
        </div>
        <p className="register-subtitle">Seleccione su ubicación: </p>
        <Mapa onLocationSelect={handleLocationSelect} />

        <p className="register-subtitle">Seleccione su dirección: </p>
        <select
          className="register-inputS-provincia"
          value={province}
          onChange={handleProvinceChange}
          required
        >
          <option value="">Provincia</option>
          {provinces.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className="register-inputS-ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option value="">Ciudad</option>
          {getCityOptions()}
        </select>
        <input
          className="register-input"
          type="text"
          placeholder="Calle Principal"
          value={mainStreet}
          onChange={(e) => {
            const value = e.target.value;
            if (
              /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\-.,()#&'"/]+$/.test(value) ||
              value === ""
            ) {
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
            if (
              /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\-.,()#&'"/]+$/.test(value) ||
              value === ""
            ) {
              setSecondaryStreet(value);
            }
          }}
          required
        />
        <div className="vendedor-section">
          <input
            type="checkbox"
            onChange={() => setShowAdditionalFields(!showAdditionalFields)}
            id="quieroSerVendedor"
          />
          <label htmlFor="quieroSerVendedor">Deseo ser vendedor</label>
        </div>

        <div className="condiciones-section">
          <input
            type="checkbox"
            id="aceptoterminos"
            checked={isTermsAccepted}
            onChange={() => setIsTermsAccepted(!isTermsAccepted)}
          />
          <label htmlFor="aceptoterminos">
            <span className="checkmark"></span>{" "}
          </label>
          <span>
            He leído y acepto los{" "}
            <a
              onClick={() => {
                setShowPopup(true);
              }}
              style={{ color: "blue", textDecoration: "underline" }}
              onMouseEnter={(e) => {
                e.target.style.cursor = "pointer";
              }}
              onMouseLeave={(e) => {
                e.target.style.cursor = "auto";
              }}
            >
              términos y condiciones
            </a>{" "}
          </span>
        </div>

        <div className={`popup ${showPopup ? "show" : ""}`}>
          <div className="popup-content">
            <h2>Términos y Condiciones de Uso</h2>
            <div className="popup-info">
              <p>
                Los términos y condiciones de uso establecen las pautas para
                interactuar con el sitio web de Prowess Agrícola, abarcando
                desde la adquisición de productos hasta el registro de usuarios.
                Se detallan responsabilidades del usuario, como la veracidad de
                la información proporcionada, así como las acciones prohibidas,
                como el uso no autorizado de dispositivos. Se abordan temas como
                la privacidad, la suspensión de cuentas por incumplimiento, la
                propiedad intelectual, y se establecen claramente las garantías
                y responsabilidades en las transacciones comerciales.{" "}
              </p>
            </div>
            <div className="popup-buttons">
              <button
                type="button"
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                Cerrar
              </button>
              <a href="/terms&conditions">
                <button type="button">Ver más</button>
              </a>
            </div>
          </div>
        </div>
        <button
          className={`register-button ${isFormValid() ? "valid" : ""}`}
          type="submit"
          disabled={!isFormValid()}
        >
          {isFormValid()
            ? "Registrarse"
            : "¡Alto! Verifica que todos los campos esten correctos"}
        </button>
      </form>

      {isFormValid() && (
        <style>
          {`
            .register-button:hover,
            .register-button.valid {
              background-color: #45a049;
            }
          `}
        </style>
      )}
    </div>
  );
}

export default Register;
