import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../Store";

const LatestSeller = ({ user }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { wish } = state;

  //if exists seller
  const sellerExists = wish.wishItems.find((x) => x._id === user._id);

  const existUser = localStorage.getItem("userInfo");

  const handlerFollow = () => {
    if (!existUser) {
      window.alert("Lo siento. Debes iniciar sesión.");
    } else {
      //If there is a user I am already following (localstorage), his id, from db
      const existItem = wish.wishItems.find((x) => x._id === user._id);
      const quantity = existItem ? existItem.quantity : 1;

      if (existItem) {
        window.alert("Lo siento. Ya estás siguiendo a este usuario.");
        return;
      }

      ctxDispatch({
        type: "WISH_ADD_ITEM",
        payload: { ...user, quantity },
      });
    }
  };

  const handlerUnfollow = (user) => {
    ctxDispatch({
      type: "WISH_REMOVE_ITEM",
      payload: user,
    });
  };

  return (

      <div className="latest-sellers" >
        
        <div className="card-latest">
          <div className="image">
          <img src={user.image.secure_url} alt={user.name} />
          <div className="info-latest">
          <ul>
          <li>
        <span className="date">
         <strong> Miembro desde: </strong> {user.createdAt.slice(0, 10)}
        </span>
        </li>
        <li><strong>Correo: </strong>
        {user.email}
        </li>
        <li><strong>Teléfono: </strong>
        {user.phone}
        </li>
        <li><strong>Dirección: </strong>
        {user.address}
        </li>
        </ul>
        </div>
      </div>
      <div className="content">
        <ul>
      <Link to={`seller/${user._id}`}>
          {user.name} <FontAwesomeIcon icon={faEye} />
        </Link>
      
          </ul> 
          </div>
        

        </div>
        
      </div>

  );

};

export default LatestSeller;
