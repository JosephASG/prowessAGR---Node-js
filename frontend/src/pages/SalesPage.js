import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SalesPage.css';

const SalesPage = () => {
  const [sales, setSales] = useState([
    { id: 1, customer: "Customer A", amount: 100, date: "2023-08-15", products: ["Product X", "Product Y"] },
    { id: 2, customer: "Customer B", amount: 150, date: "2023-08-16", products: ["Product Z"] },
    { id: 3, customer: "Customer C", amount: 200, date: "2023-08-17", products: ["Product X", "Product Z"] },
  ]);

  return (
    <div className="container mt-5 sales-page">
      <h1 className="text-center mb-4">NOTAS DE VENTA</h1>
      <ul className="list-group sales-list">
        {sales.map((sale) => (
          <li className="list-group-item sales-item" key={sale.id}>
            <Link to={`/sales/${sale.id}`} className="sale-link d-flex align-items-center">
              <div>
                <FontAwesomeIcon className="fa-user-customer mr-3" icon={faUser} />
              </div>
              <div className="flex-grow-1">
                <h5>{sale.customer}</h5>
                <ul className="list-unstyled">
                  {sale.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
                <p className="mb-0">Total: ${sale.amount}</p>
                <p className="mb-0">Date: {sale.date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesPage;
