import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cartitems.css"

const Checkout = ({
  idSeller,
  setOpenCheckout,
  cartItems,
  itemsPrice,
  taxPrice,
  totalPrice,
}) => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const id = userInfo && userInfo._id;

  //console.log(idSeller);

  const [name, setName] = useState(userInfo && userInfo.name);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [address, setAddress] = useState(userInfo && userInfo.address);
  const [phone, setPhone] = useState(userInfo && userInfo.phone);

  const handlerAddProduct = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/orders`, {
        id: userInfo._id,
        orderItems: cartItems,
        name: name,
        email: email,
        address: address,
        phone: phone,
        sellerId: idSeller,
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });

      if (data) {
        localStorage.removeItem("cartItems");
        setOpenCheckout(false);
        navigate("/account");
      }
    } catch (error) {
      console.log("Orden fallida!");
    }
  };
  return (
    <div className="passwords">
      <form onSubmit={handlerAddProduct}>
        <h3 className="orderPay"> Podrás realizar el pago después de la entrega.</h3>
        <div className="close-form" onClick={() => setOpenCheckout(false)}>
          X
        </div>
        <div className="form-group">
          <label htmlFor="name"> <b>Nombre:</b></label>
          <input
            required
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="slug"> <b>E-mail:</b></label>
          <input
            required
            type="text"
            id="slug"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category"><b>Dirección:</b></label>
          <input
            required
            type="text"
            id="category"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description"><b>Teléfono:</b></label>
          <input
            required
            type="text"
            id="description"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="form-btn">
          <center>
          <button type="submit">
            Ordenar <FontAwesomeIcon icon={faTruck} />
          </button>
          </center>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
