import React, { useEffect, useState } from 'react';
import './VendorsPage.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalEditVendors from './ModalEditVendors';
import ModalAddVendor from './ModalAddVendor';

function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false); // Define setShowAddModal
  const [editingVendorId, setEditingVendorId] = useState(null); // Define editingVendorId

  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterVendor, setFilterVendor] = useState('');
  const [sortCriteria, setSortCriteria] = useState(null);

  const vendorsPerPage = 10;

  const startIndex = (currentPage - 1) * vendorsPerPage;
  const endIndex = startIndex + vendorsPerPage;
  const currentVendors = vendors.slice(startIndex, endIndex);

  const totalPages = Math.ceil(vendors.length / vendorsPerPage);

  useEffect(() => {
    fetch(`http://localhost:5000/fb/vendedor/getSeller`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }
        return response.json();
      })
      .then((data) => setVendors(data))
      .catch((error) => console.error('Error al cargar los vendedores', error));
  }, []);

  const showVendorDetails = (vendorId) => {
    const vendor = vendors.find((p) => p.id === vendorId);
    if (vendor) {
      console.log(`Detalles del vendedor ${vendorId}:`, vendor);
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const handleEdit = (vendorId) => { // Define handleEdit
    // Implementa la lógica de edición aquí
  };

  const handleDelete = (vendorId) => { // Define handleDelete
    // Implementa la lógica de eliminación aquí
  };

  if (sortCriteria) {
    vendors.sort((a, b) => (a[sortCriteria] > b[sortCriteria] ? 1 : -1));
  }

  if (filterVendor) {
    vendors = vendors.filter(
      (vendor) =>
        vendor.pro_nombre.toLowerCase().includes(filterVendor.toLowerCase())
    );
  }

  return (
    <div className="vendors-page">
      <h2>Listado de Vendedores</h2>
      <button
        className="add-vendor-button"
        onClick={() => setShowAddModal(true)}
      >
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
            <img
              src={vendor.image}
              alt={vendor.name}
              className="vendor-image"
            />
            <h3>{vendor.name}</h3>
            <p>Ciudad: {vendor.city}</p>
            <p>Dirección: {vendor.address}</p>
            <p>Teléfono: {vendor.phoneNumber}</p>
            <button
              className="edit-button"
              onClick={() => handleEdit(vendor.id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <a href={`https://wa.me/${vendor.whatsappNumber}`}>
              <button className="whatsapp-button">WhatsApp</button>
            </a>
            <button
              className="delete-button"
              onClick={() => handleDelete(vendor.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <span
              key={pageNumber}
              className={`page-number ${
                pageNumber === currentPage ? 'active' : ''
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          )
        )}
      </div>

      {/*
      <ModalEditVendors
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingVendorId(null);
        }}
        vendorToEdit={vendors.find((vendor) => vendor.id === editingVendorId)}
        handleEdit={(editedVendor) => {
          console.log('Editar vendedor', editedVendor);
        }}
      />
*/}
      <ModalAddVendor
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        handleAddVendor={(newVendor) => {
          console.log('Agregar vendedor', newVendor);
          setShowAddModal(false);
        }}
      />
      
    </div>
  );
}

export default VendorsPage;
