import React, { useEffect, useState } from 'react';
import './VendorsPage.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalEditVendors from './ModalEditVendors'; // Importa el componente ModalEditVendors
import ModalAddVendor from './ModalAddVendor'; // Importa el componente ModalAddVendor

function VendorsPage() {
  const [vendors, setVendors] = useState([
    // Tu lista de vendedores existente...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 8;

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar/ocultar el modal de edición
  const [editingVendorId, setEditingVendorId] = useState(null); // ID del vendedor que se está editando

  const [showAddModal, setShowAddModal] = useState(false); // Estado para mostrar/ocultar el modal de agregar

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value) {
      setSearchTerm(value.toLowerCase());
    } else {
      setSearchTerm('');
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddVendor = (newVendor) => {
    // Agrega el nuevo vendedor a la lista de vendedores en el estado
    setVendors([...vendors, newVendor]);
  
    // Cierra el modal de agregar
    setShowAddModal(false);
  };

  const handleEdit = (vendorId) => {
    // Abre el modal de edición al hacer clic en el botón de editar
    setShowEditModal(true);
    setEditingVendorId(vendorId);
  };

  const handleDelete = (vendorId) => {
    // Filtra la lista de vendedores para excluir el vendedor con el ID especificado.
    const updatedVendors = vendors.filter((vendor) => vendor.id !== vendorId);

    // Actualiza el estado de la lista de vendedores con la nueva lista sin el vendedor eliminado.
    setVendors(updatedVendors);
  };

  const filteredVendors = vendors.filter((vendor) =>
  vendor.name && searchTerm && vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'city') {
      return a.city.localeCompare(b.city);
    } else {
      return 0;
    }
  });

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = sortedVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  const totalPages = Math.ceil(sortedVendors.length / vendorsPerPage);

  return (
    <div className="vendors-page">
      <h2>Listado de Vendedores</h2>
      <button className="add-vendor-button" onClick={() => setShowAddModal(true)}>
        Agregar Vendedor
      </button>
      
      <SearchBar
        searchTerm={searchTerm}
        sortOption={sortOption}
        handleSearch={handleSearch}
        handleSortChange={handleSortChange}
        showPriceOption={false}
        showCategoryOption={false}
      />

      <div className="vendor-list">
        {currentVendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <img src={vendor.image} alt={vendor.name} className="vendor-image" />
            <h3>{vendor.name}</h3>
            <p>Ciudad: {vendor.city}</p>
            <p>Dirección: {vendor.address}</p>
            <p>Teléfono: {vendor.phoneNumber}</p>
            <button className="edit-button" onClick={() => handleEdit(vendor.id)}>
              <FontAwesomeIcon icon={faEdit} /> {/* Ícono de editar */}
            </button>
            <a href={`https://wa.me/${vendor.whatsappNumber}`}>
              <button className="whatsapp-button">WhatsApp</button>
            </a>
            <button className="delete-button" onClick={() => handleDelete(vendor.id)}>
              <FontAwesomeIcon icon={faTrash} /> {/* Ícono de eliminar */}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <span
            key={pageNumber}
            className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        ))}
      </div>

      {/* Renderiza el modal de edición si showEditModal es true */}
      {showEditModal && (
        <ModalEditVendors
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false); // Cierra el modal al hacer clic en "Cerrar"
            setEditingVendorId(null); // Limpia el ID del vendedor
          }}
          vendorToEdit={vendors.find((vendor) => vendor.id === editingVendorId)}
          handleEdit={(editedVendor) => {
            // Aquí puedes manejar la lógica de edición del vendedor
            console.log('Editar vendedor', editedVendor);
          }}
        />
      )}

      {/* Renderiza el modal de agregar si showAddModal es true */}
      {showAddModal && (
        <ModalAddVendor
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)} // Cierra el modal al hacer clic en "Cerrar"
          handleAddVendor={(newVendor) => {
            // Aquí puedes manejar la lógica de agregación del nuevo vendedor
            console.log('Agregar vendedor', newVendor);

            // Cierra el modal de agregar
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

export default VendorsPage;
