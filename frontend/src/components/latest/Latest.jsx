import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LatestSeller from "./LatestSeller";
import ReactPaginate from "react-paginate";
import "./latest.css"

const Latest = () => {
  const [users, setUsers] = useState([]); //Default is empty
  const [products, setProducts] = useState([]); //Default is empty

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/users/all");
      console.log(result.data);
      setUsers(result.data);
      const res = await axios.get("/api/products");
      console.log(res.data);
      setProducts(res.data);
    };

    fetchData();
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const sellersPerPage = 8;
  const pagesVisited = pageNumber * sellersPerPage;

  const pageCount = Math.ceil(products.length / sellersPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="latest-row">
      <div className="latest-col">
        <h2 className="nuestro">Nuestros Productos </h2>       
        {products.length === 0 ? (
          <h3 className="info">Actualmente no hay productos</h3>
        ) : (
          <div className="latest-products">
            {/*i want only last 3 fetch, not all*/}
            {products.slice(pagesVisited, pagesVisited + sellersPerPage).map((product) => (
              <div className="latest-group" key={product._id}>
                <div className="latest-header">
                  <img src={product.image.secure_url} alt={product.name} />
                </div>
                <div className="latest-body">
                <Link to={`${product._id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {product.name.charAt(0).toUpperCase() + product.name.slice(1)} <FontAwesomeIcon icon={faEye} />
                </Link>
                  <span className="category">{product.category}</span>
                  <span className="price">${product.price.toFixed(2)}/kg</span>
                </div>
                
              </div>
            ))}
          </div>
        )}
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
        previousClassName={"pagi-item"}
        previousLinkClassName={"pagi-link"}
        nextClassName={"pagi-item"}
        nextLinkClassName={"pagi-link"}
        breakClassName={"pagi-item"}
        breakLinkClassName={"pagi-link"}
        disabledClassName={"disabledPagi"}
      />
      </div>
      {/*Nuevos Vendedores*/}  
    </div>
  );
};

export default Latest;
