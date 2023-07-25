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
          <img src={vendor.image} alt={vendor.name} className='info-image' />
        </div>
        <div className='my-account-info'>
          <h2>{vendor.name}</h2>
          <p><strong>Provincia: </strong>{vendor.provincia}</p>
          <p><strong>Ciudad: </strong> {vendor.city}</p>
          <p><strong>Direccion: </strong> {vendor.callePrincipal} y {vendor.calleSecundaria}</p>
          <p><strong>Numero de Telefono: </strong>{vendor.phoneNumber}</p>
          <p><strong>WhathsApp: </strong>{vendor.whatsappNumber}</p>
        </div>
        <div className='my-account-text'>
          <h2>Informacion adicional</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit magnis tristique est taciti congue, elementum curae justo turpis cras primis nisi tincidunt tortor mus vehicula. Suscipit ut eros viverra nulla elementum mollis facilisi natoque hac, eu arcu fringilla imperdiet ante nisi tincidunt class. Parturient nibh egestas curae hendrerit rutrum purus nec tempus vehicula pretium id luctus quam ante, metus posuere suscipit platea facilisis et erat sed viverra sagittis scelerisque enim turpis.</p>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
