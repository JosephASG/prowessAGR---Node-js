import React, { useState } from 'react';
import './VendorsPage.css'; // Importa el archivo de estilos CSS

function VendorsPage() {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Juan',
      city: 'Quito',
      address: 'Dirección 1',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://example.com/vendor1.jpg',
    },
    {
      id: 2,
      name: 'Pedro',
      city: 'Ambato',
      address: 'Dirección 2',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://example.com/vendor2.jpg',
    },
    {
      id: 3,
      name: 'Carlos',
      city: 'Quito',
      address: 'Dirección 1',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://example.com/vendor1.jpg',
    },
    {
      id: 4,
      name: 'Ricardo',
      city: 'Ambato',
      address: 'Dirección 2',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://example.com/vendor2.jpg',
    },
    {
      id: 5,
      name: 'Juan Carlos',
      city: 'Ambato',
      address: 'Dirección 2',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://example.com/vendor2.jpg',
    },
  
    // Agrega más vendedores según sea necesario
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 8;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);

  const totalPages = Math.ceil(vendors.length / vendorsPerPage);

  return (
    <div className="vendors-page">
      <h2>Listado de Vendedores</h2>

      <div className="search-bar">
        <input type="text" placeholder="Buscar vendedores" />
        <select>
          <option value="">Ordenar por</option>
          <option value="name">Nombre</option>
          <option value="city">Ciudad</option>
        </select>
      </div>

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
    </div>
  );
}

export default VendorsPage;