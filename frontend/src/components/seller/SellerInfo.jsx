import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../../Store";
import SellerProduct from "./SellerProduct";

const SellerInfo = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, wish } = state;

  const [seller, setSeller] = useState([]);
  const [product, setProduct] = useState([]);

  const params = useParams();
  const { id } = params;

  const existUser = localStorage.getItem("userInfo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/users/user/${id}`);
        console.log(result.data);
        setSeller(result.data);

        const res = await axios.get(`/api/products/seller/${id}`);
        console.log(res.data);
        setProduct(res.data);
      } catch (err) {
        console.log("Error!");
      }
    };
    fetchData();
  }, [id]);

  const handlerFollow = () => {
    if (!existUser) {
      window.alert("Lo siento. Debe iniciar sesión.");
    } else {
      //If there is a user I am already following (localstorage), his id, from db
      const existItem = wish.wishItems.find((x) => x._id === seller._id);
      const quantity = existItem ? existItem.quantity : 1;

      if (existItem) {
        window.alert("Lo siento. Ya estás siguiendo a este usuario.");
        return;
      }

      ctxDispatch({
        type: "WISH_ADD_ITEM",
        payload: { ...seller, quantity },
      });
    }
  };

  const handlerUnfollow = (seller) => {
    ctxDispatch({
      type: "WISH_REMOVE_ITEM",
      payload: seller,
    });
  };

  //if exists seller
  const sellerExists = wish.wishItems.find((x) => x._id === seller._id);

  return (
    <div className="seller-row">
      <div className="seller-col">
        <div className="seller-info">
        <div className="seller-header">
        <div className="seller-info2"> 
        {seller.length === 0 ? (
        <h3 className="info">Foto</h3>
        ) : (
        <img
          className="seller-image"
          src={seller.image.secure_url}
          alt={seller.name}
          style={{ width: "135px", height: "180px",left:"27px",top:"20px"}}
        />
        )}
        </div>

          </div>
          <div className="seller-body2">
            <h1 className="titulovendedor">Datos del Vendedor</h1>
            <h4>Nombre:</h4><span>{seller.name}</span>
            <br></br>
            <h4>Correo:</h4><span>{seller.email}</span>
            <br></br>
            <h4>Teléfono:</h4><span>{seller.phone}</span>
            <br></br>
            <h4>Dirección:</h4><span>{seller.address}</span>
            <br></br>
            <br></br>
          <div className="seller-footer">
            {existUser && sellerExists ? (
              <span
                key={seller._id}
                onClick={() => handlerUnfollow(seller)}
                className="unfollow"
              >
                Dejar de seguir
              </span>
            ) : (
              <span onClick={handlerFollow} className="unfollow">
                Seguir
              </span>
            )}
          </div>
          </div>
        </div>
      </div>
      <div className="seller-col">
        <h2 className="seller-title">
          Todos los productos del vendedor {seller.name}
        </h2>
        {product.length === 0 ? (
          <h3 className="info">Actualmente no hay productos!</h3>
        ) : (
          <div className="seller-products">
            <SellerProduct product={product} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerInfo;
