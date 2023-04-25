import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Store } from "../../Store";
import "./producdetails.css"
const ProductDetails = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const existUser = localStorage.getItem("userInfo");
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState([]);

  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/products/detail/${slug}`);
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

      

      setShowModal(true);

    }
  };

  return (
    <header className="bg_animate">
    <div className=".filter-product" >
    <div className="product-row">
      
      <div className="product-col">
      <div className="product-group">
      <div className="product-header">
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
      </div>
      </div>
      
      <div className="product-col">
      <div className="infopro-group">
      <div className="product-body">
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
        </div>
        <div className="product-footer">
        <div className="product-add">
          <button onClick={addToCart}>Añadir a la bolsa</button>
        </div>

        </div>
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

        <div className="burbujas">
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        </div>
      </div>
      </div>
    </div>
    </header>
  );
};

export default ProductDetails;
