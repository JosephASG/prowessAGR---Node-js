import React, { useState } from 'react';
import './MyAccountPage.css'; // Importa el archivo de estilos CSS

function MyAccountPage() {
  const [vendors, setVendors] = useState([
    {
      name: 'Melisa',
      city: 'Quito',
      address: 'Dirección 1',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://estaticos-cdn.prensaiberica.es/clip/2aa4b303-331d-4ef6-98d5-55ef6c8da594_source-aspect-ratio_default_0.jpg',
    }
  ]);

  // Obtiene el primer objeto (vendor) del arreglo
  const vendor = vendors[0];

  return (
    <div className="my-account-page">
      <h1 className="my-account-page-title">Mi Cuenta</h1>
      <div className='my-account-container'>
        <div className='my-account-info'>
          <h2>{vendor.name}</h2>
          <img src={vendor.image} alt={vendor.name} className='info-image'/>
          <p>Ciudad: {vendor.city}</p>
          <p>Dirección: {vendor.address}</p>
          <p>Teléfono: {vendor.phoneNumber}</p>
          <p>WhatsApp: {vendor.whatsappNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
