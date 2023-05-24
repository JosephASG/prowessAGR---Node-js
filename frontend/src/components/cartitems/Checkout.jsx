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
        isPaid,
        isDelivered,
        paidAt,
        deliveredAt,
   
     
     
      }) => {
        const navigate = useNavigate();
    
        const userInfo = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null;
          cartItems.forEach((item) => {
            console.log(item._id);
          });
        const id = userInfo && userInfo._id;
      /*   const producto = (quantities) => {
          const uniqueSellerIds = [...new Set(idSeller)];
        
          const separatedArrays = uniqueSellerIds.reduce((acc, curr) => {
            const filteredItems = cartItems.filter((item) => item.sellerId === curr);
            return [...acc, { sellerId: curr, items: filteredItems }];
          }, []);
        
          separatedArrays.forEach((group) => {
            console.log("ID del vendedor:", group.sellerId);
        
            group.items.forEach((item) => {
              console.log("Propiedades del elemento:", item.slug);
              console.log("Propiedades del elemento:", item.name);
        
              if (item.slug > quantities) {
                const v = item.slug ;
                console.log("Venta en producto:", v);
        
                // Resto del código para utilizar la variable `v` en caso de que se cumpla la condición
              }
            });
          });
        };
        const quantities = cartItems.map((item) => item.quantity);

        producto(quantities);
        //console.log(idSeller); */

        const [name, setName] = useState(userInfo && userInfo.name);
        const [email, setEmail] = useState(userInfo && userInfo.email);
        const [address, setAddress] = useState(userInfo && userInfo.address);
        const [phone, setPhone] = useState(userInfo && userInfo.phone);
        //console.log(cartItems)
   
        const producto =  () => {
          const _id = "646c10d6cc2d15be4fa8d0f8";
          const result = 6;
        apiSlug(_id)
        }
        
        const apiSlug = async (id) => {
          try {
            const response = await axios.put(`/api/products/slug/${id}`);
            console.log(response.data);
            alert("Ha cambiado");
          } catch (error) {
            alert("Error");
          }
        };
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
              isPaid: isPaid,
              isDelivered:isDelivered,
              paidAt: paidAt,
              deliveredAt: deliveredAt

           
            });
           
         
            if (data) {
              producto();
              localStorage.removeItem("cartItems");
              setOpenCheckout(false);
       
              navigate("/shop");
              window.location.reload();
              alert("Su orden fue realizada con exito");
            }
          } catch (error) {
            console.log("Orden fallida!");
          }
          
          

        };
        
        return (
          <div className="passwords">
            <form onSubmit={handlerAddProduct}>
              <h3 className="orderPay"> Podrás realizar el pago al momento de la entrega.</h3>
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
                                <button type="submit"  >
                  
                  Enviar <FontAwesomeIcon icon={faTruck} />
                </button>
                           
                     
                     
                
                </center>
              </div>
            
              
              
            </form>
          </div>
        );
      };

      export default Checkout;
