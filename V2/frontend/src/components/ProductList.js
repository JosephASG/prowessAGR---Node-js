import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css';

const initialProducts = [
  {
    id: 1,
    name: 'Producto 1',
    price: 10,
    stock: 20,
    vendor: 'Vendedor A',
  },
  {
    id: 2,
    name: 'Producto 2',
    price: 15,
    stock: 15,
    vendor: 'Vendedor B',
  },
  // Agrega más productos según sea necesario
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="container">
      <h1>Lista de Productos</h1>
      <div className="header-row">
        <b>Nombre</b>
        <b>Precio</b>
        <b>Stock</b>
        <b>Vendedor</b>
        <b>Acciones</b>
      </div>
      <div className="container-products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div>{product.name}</div>
            <div>${product.price}</div>
            <div>{product.stock}</div>
            <div>{product.vendor}</div>
            <div className='actions-container'>
                <FontAwesomeIcon
                    className="fa-icon-edit"
                    icon={faPenToSquare} />
                <FontAwesomeIcon
                    className="fa-icon-trash"
                    icon={faTrash}
                    onClick={() => handleDelete(product.id)}
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
