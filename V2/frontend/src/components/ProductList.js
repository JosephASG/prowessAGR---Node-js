import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css';
import ModalAddProducts from './ModalAddProducts';
import ModalEditProduct from './ModalEditProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [sortCriteria, setSortCriteria] = useState(null);
  const [filterProduct, setFilterProduct] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [productToUpdate, setProductToUpdate] = useState(null);

  //Obtener todos los productos.
  useEffect(() => {
    fetch(`http://localhost:5000/fb/producto/get`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }
        console.log(response);
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error al cargar los productos', error));
  }, []);

  //Eliminar producto 
  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/fb/producto/delete/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== productId));
        } else {
          console.error('Error al eliminar el producto en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al eliminar el producto', error);
      });
  };

  //Editar producto - Mover a ModalEditProduct.js
  const handleEdit = (productId) => {
    fetch(`http://localhost:5000/fb/producto/update/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        console.error('Error al editar el producto en el servidor');
      }
    })
  };


  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (!productToUpdate) {
      return;
    }

    fetch(`http://localhost:5000/fb/producto/update/${productToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productToUpdate),
    })
      .then((response) => {
        if (response.ok) {
          setIsModalOpen(false);
          setProductToUpdate(null);
        } else {
          console.error('Error al guardar los cambios en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al guardar los cambios', error);
      });
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilter = (product) => {
    setFilterProduct(product);
  };

  let sortedAndFilteredProducts = [...products];

  if (sortCriteria) {
    sortedAndFilteredProducts.sort((a, b) =>
      a[sortCriteria] > b[sortCriteria] ? 1 : -1
    );
  }

  if (filterProduct) {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
      (product) =>
        product.pro_nombre.toLowerCase().includes(filterProduct.toLowerCase())
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
        <button onClick={handleOpenModal} className='btn-add-product'>Agregar Producto</button>
      </div>
      <div>
        <ModalAddProducts isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
          <ModalEditProduct
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
      </div>
      <div className="header-row">
        <b onClick={() => handleSort('pro_nombre')}>Nombre</b>
        <b onClick={() => handleSort('pro_precio')}>Precio</b>
        <b onClick={() => handleSort('pro_stock')}>Stock</b>
        <b>Acciones</b>
      </div>
      <div className="filter-row">
        <label>Filtrar por Producto:</label>
        <input
          type="text"
          value={filterProduct}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <div className="container-products">
        {productsToDisplay.map((product) => (
          <div className="product" key={product.id}>
            <div>{product.pro_nombre}</div>
            <div>${product.pro_precio}</div>
            <div>{product.pro_stock}</div>
            <div className='actions-container'>
              <FontAwesomeIcon
                className="fa-icon-edit"
                icon={faPenToSquare}
                onClick={() => handleEditProduct(product)} // Abre el modal de edición al hacer clic en el ícono de edición
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
