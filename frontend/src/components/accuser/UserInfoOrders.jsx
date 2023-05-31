import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import axios from "axios";

const UserInfoOrders = ({ userOrders }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 6;
  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(userOrders.length / productsPerPage);
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
  const id = userInfo && userInfo._id;
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  function actualizarEntrega(id) {
    axios.put(`/api/orders/delivered/${id}`)
      .then(res => {
        console.log(res.data);
        alert("Orden entregada")
        window.location.reload()
        // Hacer algo con la respuesta, como actualizar el estado del componente
      })
      .catch(err => {
        console.log(err);
        alert("error")
        // Manejar errores
      });
  }
  
  return (
    <>
      {userOrders
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map((item) => (
          <h4 key={item._id}>
            Order No: {item._id.substring(0, 10)}...{" "}
            <Link className="linkOrder" to={`/order/${item._id}`}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
            <div className="estado-entrega">
          <h4>Estado de entrega:</h4>
          
          
          <span className={`estado-entrega__${item.isDelivered ? 'Entregado' : 'Pendiente'}`}>
            {item.isDelivered ? 'Entregado' : ''} 
            {!item.isDelivered && (
  <div>
    {item.isPaid ? (
      <button className="btn-entregar" onClick={() => actualizarEntrega(item._id)}>
        Entregar
      </button>
    ) : (
     
      <span>No cancelado</span>
    )}
  </div>
)}
          </span>
       
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

export default UserInfoOrders;
