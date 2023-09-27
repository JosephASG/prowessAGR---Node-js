import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './SupplierList.css';
import ModalAddSuppliers from './ModalAddSuppliers';
import ModalEditSupplier from './ModalEditSupplier';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  const ITEMS_PER_PAGE = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState(null);

  const [sortCriteria, setSortCriteria] = useState(null);
  const [filterSupplier, setFilterSupplier] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [supplierToUpdate, setSupplierToUpdate] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/fb/proveedor/get`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }
        console.log(response);
        return response.json();
      })
      .then((data) => setSuppliers(data))
      .catch((error) => console.error('Error al cargar los proveedores', error));
  }, []);

  const handleDelete = (supplierId) => {
    fetch(`http://localhost:5000/fb/proveedor/delete/${supplierId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setSuppliers(suppliers.filter((supplier) => supplier.id !== supplierId));
        } else {
          console.error('Error al eliminar al proveedor en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al eliminar al proveedor', error);
      });
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setSupplierToEdit(supplier);
    setIsEditModalOpen(true);
  };

  const handleEdit = (editedSupplier) => {
    setSupplierToUpdate(editedSupplier);
     };

  useEffect(() => {
    if (supplierToUpdate) {
      handleUpdateSupplier();
    }
  }, [supplierToUpdate]);

  const handleUpdateSupplier = () => {
    if (!supplierToUpdate) {
      return;
    }

    console.log('supplierToUpdate:', supplierToUpdate.id);

    fetch(`http://localhost:5000/fb/proveedor/update/${supplierToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplierToUpdate),
    })
      .then((response) => {
        if (response.ok) {
          // Actualiza la lista de proveedores después de la actualización en el backend
          setSuppliers((prevSuppliers) =>
            prevSuppliers.map((supplier) =>
              supplier.id === supplierToUpdate.id ? supplierToUpdate : supplier
            )
          );
          setIsEditModalOpen(false);
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

  const handleFilter = (supplier) => {
    setFilterSupplier(supplier);
  };

  let sortedAndFilteredSuppliers = [...suppliers];

  if (sortCriteria) {
    sortedAndFilteredSuppliers.sort((a, b) =>
      a[sortCriteria] > b[sortCriteria] ? 1 : -1
    );
  }

  if (filterSupplier) {
    sortedAndFilteredSuppliers = sortedAndFilteredSuppliers.filter(
      (supplier) =>
        supplier.pro_nombre.toLowerCase().includes(filterSupplier.toLowerCase())
    );
  }

  const totalPages = Math.ceil(sortedAndFilteredSuppliers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const suppliersToDisplay = sortedAndFilteredSuppliers.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Lista de Proveedores</h1>
      <div className='btn-add-container'>
        <button onClick={handleOpenModal} className='btn-add-proveedor'>Agregar Proveedor</button>
      </div>
      <div>
        <ModalAddSuppliers isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        <ModalEditSupplier
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          supplierToEdit={supplierToEdit} // Asegúrate de pasar supplierToEdit
          handleEdit={handleEdit} // Asegúrate de pasar la función handleEdit
        />
      <div className="filter-row">
        <label>Filtrar por Proveedor:</label>
        <input
          type="text"
          value={filterSupplier}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      </div>
      <div className="header-row">
        <b onClick={() => handleSort('pro_nombre')}>Nombre</b>
        <b onClick={() => handleSort('pro_precio')}>Precio</b>
        <b onClick={() => handleSort('pro_stock')}>Stock</b>
        <b onClick={() => handleSort('pro_categoria')}>Categoría</b>
        <b>Descripción</b>
        <b>Acciones</b>
      </div>

      <div className="container-suppliers">
        {suppliersToDisplay.map((supplier) => (
          <div className="supplier" key={supplier.id}>
            <div>{supplier.pro_nombre}</div>
            <div>${supplier.pro_precio}</div>
            <div>{supplier.pro_stock}</div>
            <div>{supplier.pro_categoria}</div>
            <div>{supplier.pro_descripcion}</div>
            <div className='actions-container'>
              <FontAwesomeIcon
                className="fa-icon-edit"
                icon={faPenToSquare}
                onClick={() => handleEditSupplier(supplier)} // Asegúrate de que `product` contenga el ID
              />


              <FontAwesomeIcon
                className="fa-icon-trash"
                icon={faTrash}
                onClick={() => handleDelete(supplier.id)}
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

export default SupplierList;
