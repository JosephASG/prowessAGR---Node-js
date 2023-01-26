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
        {user.name}
        </li>
        </ul>
        </div>
      </div>
      <div className="content">
      <Link to={`seller/${user._id}`}>
          {user.name} <FontAwesomeIcon icon={faEye} />
        </Link>

        {existUser && sellerExists ? (
          <span
            key={user._id}
            onClick={() => handlerUnfollow(user)}
            className="unfollow"
          >
            Dejar de seguir
          </span>
        ) : (
          <span key={user._id} onClick={handlerFollow} className="follow">
            Seguir
          </span>
        )}

        <span className="date">
          Miembro desde: {user.createdAt.slice(0, 10)}
        </span>
          </div>
        

        </div>
        
      </div>

  );

};

export default LatestSeller;
