import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Order.css';

const Order = () => {
  const userInfo = localStorage.getItem("userInfo");

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);

        console.log(data);
        setOrder(data);
      } catch (err) {
        alert("Orden no encontrada!");
      }
    };

    if (!userInfo) {
      return navigate("/");
    }

    fetchOrder();
  }, [id, navigate, userInfo]);

  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().slice(0);
    return `${day}/${month}/${year}`;
  }

  return (

    <div className="order-row">
    <button className="back-button">
     <Link className="back" to="/account">
     <FontAwesomeIcon icon={faArrowLeft} /> Regresar
     </Link>
     </button> 
     <div className="ctn-order" >
     
     <h1 className="order-title">FACTURA</h1>
     <div className="order-info">
           <img className="logo-img"
             src="../assets/images/others/prowess-logo2.png"
             alt=""
           />
           <div className="order-number">
             <div className="client">
               <h3>Nº Orden:</h3><br/>
               <h4>{order._id}</h4>
             </div>
           </div>
         </div>

         <div className="header">
         <div className="client-info">
             <div className="client">
               <span>Nombre:</span>
               <span>{order.name}</span>
             </div>

             <div className="client">
               <span>Email:</span>
               <span>{order.email}</span>
             </div>

             <div className="client">
               <span>Teléfono:</span>
               <span>{order.phone}</span>
             </div>

             <div className="client">
               <span>Dirección:</span>
               <span>{order.address}</span>
             </div>

             <div className="client">
               <span>Fecha de emisión:</span>
               <span>{formatDate(order.createdAt)}</span>
             </div>
           </div>
         </div>         
       <table className="products"> 
         <thead>
           <tr class="highlight">
             <th>Descripción</th>
             <th>Peso (Kg)</th>
             <th>Precio Unitario</th>
             <th>Precio Total</th>
           </tr>
         </thead>
 
         <thead>
         <tr >
             <th>
               {order.orderItems?.map((item) => (
                 <p style={{ textAlign: "center" }}>{item.name} </p> 
               ))}
             </th>
             <th>
               {order.orderItems?.map((item) => (
                 <p style={{ textAlign: "center" }}>{item.slug} kg</p> 
               ))}
             </th>
             <th>
             {order.orderItems?.map((item) => (
                 <p style={{ textAlign: "center" }} className="price">${item.price.toFixed(2)}/kg</p>
               ))}  
             </th>
             <th>
               {order.orderItems?.map((item) => (
                 <p style={{ textAlign: "center" }} className="price">${((item.price)*(item.quantity)).toFixed(2)}</p>
               ))}   
             </th>
           </tr>
         </thead>
           <tbody >
             <td colSpan={2}></td>
             <th><p>Subtotal:</p></th>
             <th><span>${order.totalPrice?.toFixed(2)}</span></th>
           </tbody>
           <tbody >
             <td colSpan={2}></td>
             <th><p>IVA (0%):</p></th>
             <th><span>${order.taxPrice?.toFixed(2)}</span></th>
           </tbody>
           <tbody>
             <td colSpan={2}></td>
             <th><p>Total:</p></th>
             <th><span>${order.totalPrice?.toFixed(2)}</span></th>
           </tbody> 
           <th rowSpan={2}></th>
           <tbody>
             <td colSpan={2}></td>
             <th><p>Pagado:</p></th>
             <th>
           {order.isPaid ? (
                 <span> Paid at {order.paidAt} </span>
               ) : (
                 <span>Not pagado!</span>
               )}
           </th>
           </tbody>
           <tbody>
             <td colSpan={2}></td>
             <th><p>Entregado:</p></th>
             <th>
               {order.isDelivered ? (
                 <span> Delivered at {order.deliveredAt} </span>
               ) : (
                 <span>No entregado!</span>
               )}
           </th>
         </tbody>  
           
     </table>
     </div>
   </div>


    /*<div className="orderContainer">
      <Link className="back" to="/account">
        <FontAwesomeIcon icon={faArrowLeft} /> Volver
      </Link>
      <div className="orderRow">
        <h3>Mi orden No: {order._id}</h3>
      </div>
      <div className="orderRow products">
        <div className="orderCol">
          <div className="cards">
            {order.orderItems?.map((item) => (
              <div className="filter-card" key={item._id}>
                <div className="card-header">
                  <img src={item.image.secure_url} alt={item.name} />
                  <Link to={`../seller/${item.sellerId}`}>
                    <img
                      className="card-sellers"
                      src={item.sellerImage}
                      alt={item.seller}
                    />
                  </Link>
                </div>
                <div className="card-body">
                  <Link to={`../${item._id}`}>
                    {item.name} <FontAwesomeIcon icon={faEye} />
                  </Link>
                  <span className="price">${item.price.toFixed(2)}/kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="orderCol">
          <div className="infoGroups">
            <div className="info-group">
              <span>Nombre:</span>
              <span>{order.name}</span>
            </div>
            <div className="info-group">
              <span>Email:</span>
              <span>{order.email}</span>
            </div>
            <div className="info-group">
              <span>Teléfono:</span>
              <span>{order.phone}</span>
            </div>
            <div className="info-group">
              <span>Dirección:</span>
              <span>{order.address}</span>
            </div>
          </div>
          <div className="infoGroups">
            <div className="info-group">
              <span>IVA:</span>
              <span>${order.taxPrice?.toFixed(2)}</span>
            </div>
            <div className="info-group">
              <span>Precio total:</span>
              <span>${order.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
          <div className="infoGroups">
            <div className="info-group">
              <span>Pagado:</span>
              {order.isPaid ? (
                <span> Paid at {order.paidAt} </span>
              ) : (
                <span>Not pagado!</span>
              )}
            </div>
            <div className="info-group">
              <span>Entregado:</span>
              {order.isDelivered ? (
                <span> Delivered at {order.deliveredAt} </span>
              ) : (
                <span>No entregado!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>*/
  );
};

export default Order;
