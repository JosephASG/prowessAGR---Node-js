import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext,useState} from "react";
import { Link } from "react-router-dom";
import { Store } from "../../Store";
import '../filters/Filter.css'

const FillterProductInfo = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const [showModal, setShowModal] = useState(false);
  const existUser = localStorage.getItem("userInfo");

  const addToCart = () => {
    if (!existUser) {
      window.alert("Lo siento. Debes iniciar sesión.");
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
    <div className="shoppage">
      <div className="filter-card" key={product._id}>
        <div className="card-header">
          <img src={product.image.secure_url} alt={product.name} />
          <Link to={`../seller/${product.sellerId}`}>
            <img
              className="card-sellers"
              src={product.sellerImage}
              alt={product.seller}
            />
          </Link>
        </div>
        <div className="card-body">
          <Link to={`../${product.slug}`}>
            {product.name} <FontAwesomeIcon icon={faEye} />
          </Link>
          <span className="category">{product.category}</span>
          <span className="price">${product.price.toFixed(2)}/kg</span>
        </div>
        <div className="card-footer">
        <button onClick={addToCart}>Añadir a la bolsa</button>
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
  </div>
  );
};

export default FillterProductInfo;
