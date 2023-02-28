import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../Store";
import Button from "@mui/material/Button";

const SellFilterInfo = ({ user }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { wish } = state;

  //if exists seller
  const sellerExists = wish.wishItems.find((x) => x._id === user._id);

  const existUser = localStorage.getItem("userInfo");

  const handlerFollow = () => {
    if (!existUser) {
      window.alert("Lo siento. Debe iniciar sesión.");
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
    
    <div className="container-card">
      <div className="card">
        <div>
          {" "}
          {/* body*/}
          <div>
            {" "}
            <div>
              <Link to={`../seller/${user._id}`}></Link>
            </div>
            <div class="cta-container transition">
              {existUser && sellerExists ? (
                <Button variant="contained" color="error" size="medium">
                  <span onClick={() => handlerUnfollow(user)}>Dejar de seguir</span>
                </Button>
                ) : (
                  <Button variant="contained" size="medium" color="success">
                    <span key={user._id} onClick={handlerFollow}>
                      Seguir
                      </span>
                  </Button>
                )}
            </div>
            <div class="card_circle transition">
              <div className="image">
                <img src={user.image.secure_url} alt={user.name} />
              </div>
            </div>
          </div>
          <div key={user._id}>
            <h2 className="data-vendor">{user.name}</h2>
            <h2 class="member">Miembro Desde: {user.createdAt.slice(0, 10)}</h2>
          </div>
          <div className="wrapper-info">
            <div className="sub_card">
              <h2 className="mail">&nbsp;&nbsp;&nbsp;Correo: </h2>
              <br></br>
              <h3 className="m_mail">&nbsp;&nbsp;&nbsp;{user.email}</h3>
              <br></br>
              <h2 className="address">&nbsp;&nbsp;&nbsp;Dirección:</h2>
              <br></br>
              <h3 className="a_address">{user.address}</h3>
              <br></br>
              <h2 className="phone">&nbsp;&nbsp;&nbsp;Teléfono:</h2>
              <br></br>
              <h3 className="p_phone">{user.phone}</h3>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default SellFilterInfo;
