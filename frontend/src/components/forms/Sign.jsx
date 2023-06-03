import { faArrowUpRightFromSquare, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./forms.css"
const Sign = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [commission, setCommission] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "option2") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handlePhoneChange = (event) => {
    const inputPhone = event.target.value.replace(/\D/g, ""); // elimina todos los caracteres que no son dígitos
    if (inputPhone.length <= 10) {
      setPhone(inputPhone);
    }
    if (inputPhone.length >=10) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }

    //Verificamos usuarioAdmi
    

  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (passwordError) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
        address,
        phone,
        commission,
        selectedOption,
        isAdmin
      });
      alert("Te has registrado con éxito");
      navigate("/login");
    } catch (error) {
      console.log("Error!", error);
      alert("Registro fallido, por favor intente de nuevo");
    }
  };

  return (
    <div className="form-row">
      <form onSubmit={submitHandler}> 
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            required
            onChange={(event) => setName(event.target.value)}
            type="text"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            required
            onChange={handlePasswordChange}
            type="password"
            id="password"
          />
          {passwordError && (
            <span className="error-message">
              La contraseña debe tener al menos 8 caracteres
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="r_password">Confirmar contraseña</label>
          <input
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            id="r_password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            required
            onChange={(event) => setAddress(event.target.value)}
            type="text"
            id="address"
          />
        </div>
      
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            required
            onChange={handlePhoneChange}
            type="text"
            id="phone"
            value={phone}
          />
          {phoneError && (
            <span className="error-message">
              El número debe constar de exactamente 10 dígitos
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="options">Tipo de Usuario: </label>
          <select name="options" value={selectedOption} onChange={handleOptionChange}>
            <option value="">Seleccione una opcion</option>
            <option value="option1">Cliente</option>
            <option value="option2">Vendedor</option>
          </select>
        </div>
        {selectedOption === "option2" && (
        <div className="form-group">
          <label htmlFor="commission">Comisión</label>
          {commission !== 0 ? (
              <input
                type="text"
                onChange={(e) => setCommission(e.target.value)}
                value={commission}
                id="commission" 
              />
            ) : (
              <span>{commission}</span>
            )}
        </div>
      )}
        <div className="form-btn-c">
          <button className="btn-reg2" type="submit">
            Registrarse
          </button>
        </div>
        <div className="form-btn-d">
          <button className="btn-acc2">
            <Link to="/login">Acceder</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sign;