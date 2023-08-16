import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css';
import ModalAddProducts from './ModalAddProducts';
import ModalEditProduct from './ModalEditProduct';

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
  {
    id: 3,
    name: 'Producto 3',
    price: 25,
    stock: 10,
    vendor: 'Vendedor C',
  },
  {
    id: 4,
    name: 'Producto 4',
    price: 12,
    stock: 5,
    vendor: 'Vendedor A',
  },
  {
    id: 5,
    name: 'Producto 5',
    price: 18,
    stock: 8,
    vendor: 'Vendedor D',
  },
  {
    id: 6,
    name: 'Producto 6',
    price: 30,
    stock: 3,
    vendor: 'Vendedor B',
  },
  {
    id: 7,
    name: 'Producto 7',
    price: 22,
    stock: 12,
    vendor: 'Vendedor C',
  },
  {
    id: 8,
    name: 'Producto 8',
    price: 28,
    stock: 6,
    vendor: 'Vendedor A',
  },
  {
    id: 9,
    name: 'Producto 9',
    price: 14,
    stock: 18,
    vendor: 'Vendedor D',
  },
  {
    id: 10,
    name: 'Producto 10',
    price: 17,
    stock: 9,
    vendor: 'Vendedor B',
  },
  {
    id: 11,
    name: 'Producto 11',
    price: 21,
    stock: 14,
    vendor: 'Vendedor C',
  },
  {
    id: 12,
    name: 'Producto 12',
    price: 8,
    stock: 22,
    vendor: 'Vendedor A',
  },
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 5; // Número de productos por página

  const [sortCriteria, setSortCriteria] = useState(null);
  const [filterVendor, setFilterVendor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleOpenAddModal = () => {
    setisAddModalOpen(true);
  };

  const handleModalAddClose = () => {
    setisAddModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleModalEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilter = (vendor) => {
    setFilterVendor(vendor);
  };

  let sortedAndFilteredProducts = [...products];

  if (sortCriteria) {
    sortedAndFilteredProducts.sort((a, b) =>
      a[sortCriteria] > b[sortCriteria] ? 1 : -1
    );
  }

  if (filterVendor) {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
      (product) => product.vendor.toLowerCase().includes(filterVendor.toLowerCase())
    );
  }

  const totalPages = Math.ceil(sortedAndFilteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const productsToDisplay = sortedAndFilteredProducts.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Lista de Productos</h1>
      <div className='btn-add-container'>
        <button onClick={handleOpenAddModal} className='btn-add-product'>Agregar Producto</button>
      </div>
      <div>
        <ModalAddProducts isOpen={isAddModalOpen} onClose={() => setisAddModalOpen(false)} />
      </div>
      <div>
        <ModalEditProduct isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      </div>
      <div className="header-row">
        <b onClick={() => handleSort('name')}>Nombre</b>
        <b onClick={() => handleSort('price')}>Precio</b>
        <b onClick={() => handleSort('stock')}>Stock</b>
        <b onClick={() => handleSort('vendor')}>Vendedor</b>
        <b>Acciones</b>
      </div>
      <div className="filter-row">
        <label>Filtrar por Vendedor:</label>
        <input
          type="text"
          value={filterVendor}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <div className="container-products">
        {productsToDisplay.map((product) => (
          <div className="product" key={product.id}>
            <div>{product.name}</div>
            <div>${product.price}</div>
            <div>{product.stock}</div>
            <div>{product.vendor}</div>
            <div className='actions-container'>
              <FontAwesomeIcon
                className="fa-icon-edit"
                icon={faPenToSquare}
                onClick={handleOpenEditModal}
              />
              <FontAwesomeIcon
                className="fa-icon-trash"
                icon={faTrash}
                onClick={() => handleDelete(product.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductList;
