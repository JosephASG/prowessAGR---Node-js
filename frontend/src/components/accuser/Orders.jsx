import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link ,useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import './Order.css';
import EditProduct from "./EditProduct";
import Order from "./Order";
import moment from 'moment-timezone';

const Orders = ({ orders}) => {
  
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 6;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(orders.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
  const id = userInfo && userInfo._id;

const [order, setOrder] = useState(null);

function actualizarPedido(id) {
  if(window.confirm("Desea continuar ")){
    axios.put(`/api/orders/update/${id}`)
    .then(res => {
      console.log(res.data);
   alert("Orden Pagada")


   window.location.reload();
    })
    .catch(err => {
      console.log(err);
      alert("error")
      // Manejar errores
    });
  }
  
}



function cancelarOrden(id) {
  if(window.confirm("Desea eliminar la orden ")){
  axios.delete(`/api/orders/delete/${id}`)
    .then(res => {
      console.log(res.data);
      alert("Orden Cancelada");
      window.location.reload();
    })
    .catch(err => {
      console.error(err);
      window.location.reload();
    });
  }
}

function actualizarSlug(ide) {
  axios.put(`/api/products/delete/${ide}`)
    .then(res => {
      console.log(res.data);
   alert("slug cambiado")
   window.location.reload();
    })
    .catch(err => {
      console.log(err);
      alert("error")
      // Manejar errores
    });
}



  return (
    <>
      {orders
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map((order) => (
          
          <h4 key={order._id}>
            Order No: {order._id.substring(0, 10)}...{" "}
            <Link className="linkOrder" to={`/order/${order._id}`}>
              <FontAwesomeIcon icon={faEye}  ></FontAwesomeIcon>
              
            </Link>
            <div className="estado-pago">
          <h3>Estado de pago:</h3>
          <span className={`estado-pago__${order.isPaid ? 'pagado' : 'pendiente'}`}>
            {order.isPaid ? 'Pagado' : 'Pendiente'}
          </span>
          
          {!order.isPaid && (
          <button className="btn-pagar" onClick={() => { actualizarPedido(order._id) }}>
          Pagar
        </button>
          )}
          {!order.isPaid && (
            <button className="btn-pagar" onClick={() => {cancelarOrden(order._id)}}>
             Cancelar
            </button>          
          )}
  
            </div>
          </h4>

        ))}

      <ReactPaginate
        className="filter-pagination"
        previousLabel={"Ant"}
        nextLabel={"Sig"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        pageClassName={"pagi-item"}
        pageLinkClassName={"pagi-link"}
        activeClassName={"pagi-active"}
        activeLinkClassName={"pagi-active-link"}
        previousClassName={"pagi-item"}
        previousLinkClassName={"pagi-link"}
        nextClassName={"pagi-item"}
        nextLinkClassName={"pagi-link"}
        breakClassName={"pagi-item"}
        breakLinkClassName={"pagi-link"}
        disabledClassName={"disabledPagi"}
       
      />

    </>
  );
};

export default Orders;
