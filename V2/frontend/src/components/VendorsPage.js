import React, { useState } from 'react';
import './VendorsPage.css';
import SearchBar from './SearchBar';

function VendorsPage() {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Juan',
      city: 'Quito',
      address: 'Dirección 1',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://static.vecteezy.com/system/resources/previews/022/932/692/non_2x/pleading-face-emoji-yellow-face-emoji-with-a-small-frown-and-large-eyes-as-if-begging-or-pleading-popular-chat-elements-free-vector.jpg',
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
    {
      id: 6,
      name: 'Gabriel',
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

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <SearchBar
        searchTerm={searchTerm}
        sortOption={sortOption}
        handleSearch={handleSearch}
        handleSortChange={handleSortChange}
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