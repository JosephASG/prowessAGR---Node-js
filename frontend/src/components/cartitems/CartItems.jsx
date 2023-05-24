import {
  faEye,
  faMinusCircle,
  faPlusCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { useState ,useParams} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import Checkout from "./Checkout";
import "./cartitems.css"

const CartItems = () => {
  const navigate = useNavigate();

  const [openCheckout, setOpenCheckout] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      localStorage.getItem("userInfo");
      navigate("/");
    }
  });
 
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const idSeller = cartItems.map((sellId) => sellId.sellerId);
  //console.log(idSeller);
  //cartItems.map((item) => {
    //const product = item.name;
    // Realiza las operaciones que necesites con el producto
    // Por ejemplo, muestra el nombre del producto en la consola
    //console.log("Nombre del producto:", product);
    // También puedes devolver el producto si deseas almacenarlo en un nuevo arreglo
    //return product;
 // });
  
  //const totalItems = cartItems.reduce((a, c) => a + c.quantity, 0);

  const roundPrice = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = roundPrice(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const taxPrice = roundPrice(0.0 * itemsPrice); //Impuesto 0%
  const totalPrice = itemsPrice + taxPrice;
  const isPaid= false;
  const isDelivered=false;
  const fechaHoraActual = "No paid";
  const [openEdit, setOpenEdit] = useState(false);

const paidAt=fechaHoraActual;  
const deliveredAt=fechaHoraActual; 
/* const producto =(quantity)=>{
const uniqueSellerIds = [...new Set(idSeller)];

const separatedArrays = uniqueSellerIds.reduce((acc, curr) => {
const filteredItems = cartItems.filter((item) => item.sellerId === curr);
return [...acc, { sellerId: curr, items: filteredItems }];
}, []);
//console.log("Arreglos separados por ID de vendedor:", separatedArrays);
// Mostrar los IDs de los vendedores y las propiedades de cada elemento en los arreglos separados
separatedArrays.forEach((group) => {
console.log("ID del vendedor:", group.sellerId);
group.items.forEach((item) => {
console.log("Propiedades del elemento:", item.slug);
console.log("Propiedades del elemento:", item.name);
if (item.slug > quantity) {
  const v = item.slug - quantity;
  console.log("Venta en producto:", v);
  // Resto del código para utilizar la variable `v` en caso de que se cumpla la condición
} 
});
});
}  ;
 */

//producto();
  const updateQuantityHandler = async (item, quantity) => {
   // producto(item.quantity)
   
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });

  };
 

  const removeProduct = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  return (
    <div className="cart-row">
      <div className="ctn-cart">
        <h1 className="cart-title">MI BOLSA DE COMPRAS</h1>
        <div className="cart-items">
          <div className="cart-col">
            {cartItems.length === 0 ? (
              <h3 className="info-empty">Tu bolsa está vacía!</h3>
            ) : (
              <div className="cart-cards">
                {cartItems.map((item) => (
                  <div className="filter-card" key={item._id}>

                    <div className="card-header">
                      <img src={item.image.secure_url} alt={item.name} />
                      <Link to={`../seller/${item.sellerId}`}>
                        <img
                          className="card-sellers"
                          src={item.sellerImage}
                          alt={item.sellerName}
                          
                        />
                      </Link>
                    </div>
                    <div className="card-body">
                      <div className="view-product-page">
                        <Link to={`../${item._id}`}>
                          {item.name} <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </div>
                      <div className="view-product-info">
                        <span className="category">{item.category}</span>
                        <span className="price">
                          ${Number(item.price).toFixed(2)}/kg
                        </span>
                      </div>
                    </div>
                    <div className="card-action">
                      <button
                      onClick={() => {
                        updateQuantityHandler(item, item.quantity - 1);
                        //producto(item.quantity-1);
                        
                      }}
                        disabled={item.quantity === 1}
                      >
                        <FontAwesomeIcon icon={faMinusCircle} />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantityHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === parseInt(item.slug) }
                      >
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </button>
                    </div>
                    <div className="card-footer cart">
                      <button onClick={() => removeProduct(item)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="cart-col">
            <div className="cart-bill">
              <h2 className="bill-title">Mi factura</h2>
              {cartItems.length === 0 ? (
                <h3 className="info">No hay productos!</h3>
              ) : (
                <div className="bill-groups">
                  {cartItems.map((product) => (
                    <div className="bill-group" key={product._id}>
                      <span>{product.name}</span>
                      <span>${Number(product.price).toFixed(2)}/kg</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="bill-total">
                <div className="bill-group">
                  <span>SubTotal:</span>
                  <span>
                    {"$"+totalPrice}
                  </span>
                </div>
                <div className="bill-group">
                  <span>IVA 0%:</span>
                  <span>${taxPrice}</span>
                </div>
                <div className="bill-group">
                  <h3>Total:</h3>
                  <h3>${totalPrice.toFixed(2)}</h3>
                  
                </div>
         
              </div>
              <div className="bill-btn">
                    <button 
                    disabled={cartItems.length === 0 }   
                    style={{backgroundColor: cartItems.length === 0 ? 'red' : 'green', color: 'white'}}  
                    onClick={() => 
                      setOpenCheckout(true) }>
                    Ordenar
                   
                  </button>
                    {cartItems.length === 0 && (
                      <div style={{ color: 'red' , marginTop:'15px' ,padding: '20px' ,textAlign: "center"} }>
                        Agregue un producto primero
                      </div>
                    )}
                  </div>
            </div>
          </div>
        </div>
        <div>
      
    </div>
      </div>
      
      {openCheckout && (
        <Checkout
        
          idSeller={idSeller}
          setOpenCheckout={setOpenCheckout}
          cartItems={cartItems}
          itemsPrice={itemsPrice}
          taxPrice={taxPrice}
          totalPrice={totalPrice}
          isPaid={isPaid}
          isDelivered={isDelivered}
          paidAt ={paidAt}
          deliveredAt ={deliveredAt}
     
       
        />
      
      )}
      <div>
      
    </div>
    
    </div>
    
  );
};

export default CartItems;
