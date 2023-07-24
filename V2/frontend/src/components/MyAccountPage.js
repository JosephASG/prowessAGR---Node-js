import React, { useState } from 'react';
import './MyAccountPage.css'; // Importa el archivo de estilos CSS

function MyAccountPage() {
  const [vendors, setVendors] = useState([
    {
      name: 'Melisa Carbajal',
      city: 'Quito',
      provincia: 'Dirección 1',
      callePrincipal:'calle principal',
      calleSecundaria: 'calle secundaria',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://estaticos-cdn.prensaiberica.es/clip/2aa4b303-331d-4ef6-98d5-55ef6c8da594_source-aspect-ratio_default_0.jpg',
    }
  ]);

  // Obtiene el primer objeto (vendor) del arreglo
  const vendor = vendors[0];

  return (
    <div className="my-account-page">
      <div className='my-account-container'>
        <div className='my-account-img'>
          <h2>{vendor.name}</h2>
          <img src={vendor.image} alt={vendor.name} className='info-image' />
        </div>
        <div className='my-account-info'>
          <br/><br/><br/>
          <p><strong>Provincia: </strong>{vendor.provincia}</p>
          <p><strong>Ciudad: </strong> {vendor.city}</p>
          <p><strong>Direccion: </strong> {vendor.callePrincipal} y {vendor.calleSecundaria}</p>
          <p><strong>Numero de Telefono: </strong>{vendor.phoneNumber}</p>
          <p><strong>WhathsApp: </strong>{vendor.whatsappNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
