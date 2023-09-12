import React, { useEffect, useState } from 'react';
import './VendorsPage.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalEditVendors from './ModalEditVendors'; // Importa el componente ModalEditVendors

function VendorsPage() {
  const [vendors, setVendors] = useState([
    // Tu lista de vendedores existente...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 8;

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [editingVendorId, setEditingVendorId] = useState(null); // ID del vendedor que se está editando

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddVendor = () => {
    // Aquí puedes abrir un formulario o realizar cualquier otra acción para agregar un nuevo vendedor.
    // Luego, obtén los detalles ingresados y crea un nuevo vendedor.
    // Por ejemplo:
    const newVendor = {
      id: vendors.length + 1,
      name: 'Nuevo Vendedor',
      city: 'Ciudad Nueva',
      address: 'Dirección Nueva',
      phoneNumber: '9876543210',
      whatsappNumber: '1234567890',
      image: 'https://example.com/new_vendor.jpg',
    };

    // Actualiza el estado de la lista de vendedores agregando el nuevo vendedor.
    setVendors([...vendors, newVendor]);
  };

  const handleEdit = (vendorId) => {
    // Abre el modal de edición al hacer clic en el botón de editar
    setShowEditModal(true);
    setEditingVendorId(vendorId);
  };

  const handleDelete = (vendorId) => {
    // Aquí puedes implementar la lógica para eliminar un vendedor.
    // Debes proporcionar el ID del vendedor que se debe eliminar.
    console.log(`Eliminar vendedor con ID ${vendorId}`);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <button className="add-vendor-button" onClick={handleAddVendor}>
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
            <a href={`https://wa.me/${vendor.whatsappNumber}`}>
              <button className="whatsapp-button">WhatsApp</button>
            </a>
            <button className="edit-button" onClick={() => handleEdit(vendor.id)}>
              <FontAwesomeIcon icon={faEdit} /> {/* Ícono de editar */}
            </button>
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
    </div>
  );
}

export default VendorsPage;
