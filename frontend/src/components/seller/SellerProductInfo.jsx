import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../Store";

const SellerProductInfo = ({ pro }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const existUser = localStorage.getItem("userInfo");

  const addToCart = () => {
    if (!existUser) {
      window.alert("Lo siento. Debe iniciar sesión.");
    } else {
      const existItem = cart.cartItems.find((x) => x._id === pro._id);
      const quantity = existItem ? existItem.quantity + 1 : 1; // if exists in cart than quantity + 1, if not than 1

      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...pro, quantity },
      });
    }
  };

  const capitalizedName = pro.name.charAt(0).toUpperCase() + pro.name.slice(1);

  return (
    <div className="filter-card" key={pro._id}>
      <div className="card-header">
        <img src={pro.image.secure_url} alt={pro.name} />
      </div>
      <div className="card-body">
        <Link to={`../${pro._id}`}>
          {capitalizedName} <FontAwesomeIcon icon={faEye} />
        </Link>
        <span className="category">{pro.category}</span>
        <span className="price">${pro.price.toFixed(2)}/kg</span>
      </div>
      <div className="card-footer">
        <button onClick={addToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default SellerProductInfo;

/* import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../Store";
import '../filters/Filter.css'

const SellerProductInfo = ({ pro }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const [showModal, setShowModal] = useState(false);
  const existUser = localStorage.getItem("userInfo");

  const addToCart = () => {
    if (!existUser) {
      window.alert("Lo siento. Debe iniciar sesión.");
    } else {
      const existItem = cart.cartItems.find((x) => x._id === pro._id);
      const quantity = existItem ? existItem.quantity + 1 : 1; // if exists in cart than quantity + 1, if not than 1

      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...pro, quantity },
      });
    }
  };

  const capitalizedName = pro.name.charAt(0).toUpperCase() + pro.name.slice(1);
  
  return (
    <div className="filter-card" key={pro._id}>
      <div className="card-header">
        <img src={pro.image.secure_url} alt={pro.name} />
      </div>
      <div className="card-body">
        <Link to={`../${pro._id}`}>
          {capitalizedName} <FontAwesomeIcon icon={faEye} />
        </Link>
        <span className="category">{pro.category}</span>
        <span className="price">${pro.price.toFixed(2)}/kg</span>
      </div>
      <div className="card-footer">
        <button onClick={addToCart}>Añadir al carrito</button>
      </div>
      {showModal && (
  <div className="modal">
    <div className="modal-content">
      <p className="one">El producto seleccionado se añadió correctamente.</p>
      <Link to="/cart" className="two">
        <button  >Carrito</button>
      </Link>
      <button className="three" onClick={() => setShowModal(false)}>Cerrar</button>
    </div>
  </div>
)}
    </div>
  );
};

export default SellerProductInfo; */
