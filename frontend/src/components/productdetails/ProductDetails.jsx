import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Store } from "../../Store";

const ProductDetails = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const existUser = localStorage.getItem("userInfo");

  const [product, setProduct] = useState([]);

  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        console.log(result.data);
        setProduct(result.data);
      } catch (err) {
        console.log("Error!" + err.message);
      }
    };
    fetchData();
  }, [slug]);

  const addToCart = () => {
    if (!existUser) {
      window.alert("Lo siento. Debe iniciar sesión.");
    } else {
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1; // if exists in cart than quantity + 1, if not than 1

      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity },
      });
    }
  };

  return (
    <div className="product-row">
      <div className="product-col">
      {product.length === 0 ? ( 
            <h3 className="info">Foto Producto</h3>
          ) : (
            <img src={product.image.secure_url} alt={product.name} />
          )}
        <Link to={`../seller/${product.sellerId}`}>
          <img
            className="seller-product"
            src={product.sellerImage}
            alt={product.seller}
          />
        </Link>
      </div>
      <div className="product-col">
        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <span className="category">{product.category}</span>
        </div>
        <div className="product-info">
          <span className="price">
            Precio: ${Number(product.price).toFixed(2)}/kg
          </span>
          <span className="desc">{product.description}</span>
        </div>
        <div className="product-add">
          <button onClick={addToCart}>Añadir a la bolsa</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
