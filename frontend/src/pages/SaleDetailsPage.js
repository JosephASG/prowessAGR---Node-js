import React from "react";
import { useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './SaleDetailsPage.css';

const SaleDetailsPage = () => {
  const { id } = useParams();
  
  const sale = {
    id: id,
    customer: "Customer A",
    amount: 100,
    date: "2023-08-22",
    products: [
      { id: 1, image: "https://www.bupasalud.com/sites/default/files/inline-images/fuji-red.jpg", name: "Manzanas", description: "Manzanas frescas", price: 50, quantity: 2, seller: "Seller X" },
      { id: 2, image: "https://farmaciaribera.es/blog/wp-content/uploads/2020/01/Beneficios-de-comer-peras-1024x680.jpg", name: "Peras", description: "Peras Dulces", price: 30, quantity: 3, seller: "Seller Y" },
      { id: 3, image: "https://www.bupasalud.com/sites/default/files/inline-images/fuji-red.jpg", name: "Manzanas", description: "Manzanas frescas", price: 50, quantity: 2, seller: "Seller Z" },
    ],
  };

  return (
    <div className="container mt-4">
      <h1>Detalles de la Venta</h1>
      <div className="div-customer p-3 rounded shadow-sm">
        <div>
          <strong>Customer:</strong> {sale.customer}
        </div>
        <div className="mt-4">
          <h2>Productos</h2>
          <div className="border border-white rounded">
            <div className="d-grid grid-template-columns-6 text-center fw-bold p-2 border-bottom border-white">
              <div>Imagen</div>
              <div>Nombre</div>
              <div>Descripción</div>
              <div>Precio</div>
              <div>Cantidad</div>
              <div>Vendedor</div>
            </div>
            {sale.products.map((product, index) => (
              <div key={index} className={`d-grid grid-template-columns-6 text-center p-2 ${index % 2 === 0 ? 'bg-light' : ''} border-bottom border-white`}>
                <div><img className="img-product-sale" src={product.image} alt={product.name} /></div>
                <div>{product.name}</div>
                <div>{product.description}</div>
                <div>${product.price}</div>
                <div>{product.quantity}</div>
                <div>{product.seller}</div>
              </div>
            ))}
            <div className="d-grid grid-template-columns-6 text-center p-2 border-bottom border-white bg-light">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <strong>Subtotal:</strong> ${sale.amount}
              </div>
            </div>
            <div className="d-grid grid-template-columns-6 text-center p-2 border-bottom border-white">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <strong>Total:</strong> ${sale.amount}
              </div>
            </div>
            <div className="d-grid grid-template-columns-6 text-center p-2 bg-light">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <strong>Fecha:</strong> {sale.date}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Link to="/sales" className="btn btn-primary">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailsPage;
