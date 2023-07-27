import React, { useState } from 'react';
import './MyAccountPage.css'; // Importa el archivo de estilos CSS

function MyAccountPage() {
  const [userType, setUserType] = useState('vendor');

  const vendors = [
    {
      name: 'Melisa Carbajal',
      city: 'Quito',
      provincia: 'Dirección 1',
      callePrincipal: 'calle principal',
      calleSecundaria: 'calle secundaria',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      image: 'https://estaticos-cdn.prensaiberica.es/clip/2aa4b303-331d-4ef6-98d5-55ef6c8da594_source-aspect-ratio_default_0.jpg',
    }
  ];

  const buyers = [
    {
      name: 'Juan Perez',
      city: 'Quito',
      provincia: 'Dirección 1',
      callePrincipal: 'calle principal',
      calleSecundaria: 'calle secundaria',
      phoneNumber: '123456789',
      whatsappNumber: '987654321',
      purchaseSatatus: 'Pendiente',
      products: [
        'Milk',
        'Eggs',
        'Cheese',
        'Bread',
        'Butter',
        'Yogurt',
      ],
      image: 'https://previews.123rf.com/images/yupiramos/yupiramos1605/yupiramos160521144/57463141-dise%C3%B1o-comprador-avatar-ejemplo-gr%C3%A1fico-del-vector-eps10.jpg',
    }
  ];

  // Obtiene el primer objeto (usuario) del arreglo según el tipo
  const user = userType === 'vendor' ? vendors[0] : buyers[0];

  console.log(user);
  return (
    <div className="my-account-page">
      <div className={`my-account-container ${userType === 'vendor' ? 'vendor-info' : 'buyer-info'}` }>
        <div className='my-account-img'>
          <img src={user.image} alt={user.name} className='info-image' />
        </div>
        <div className='my-account-info'>
          <h2>{user.name}</h2>
          <p><strong>Provincia: </strong>{user.provincia}</p>
          <p><strong>Ciudad: </strong> {user.city}</p>
          <p><strong>Direccion: </strong> {user.callePrincipal} y {user.calleSecundaria}</p>
          {userType === 'buyer' && (
            <div className='my-account-info'>
              <p><strong>Estado de Compra: </strong> {user.purchaseSatatus}</p>
              {user.products.map((product, index) => (
                <p key={index}><strong>Producto {index + 1}: </strong> {product}</p>
              ))}
            </div>
          )}
          {userType === 'vendor' && (
            <div className='my-account-info'>
              <a href={`https://wa.me/${user.whatsappNumber}`}>
                <button className="whatsapp-button">WhatsApp</button>
              </a>
            </div>
          )}
        </div>
        <div className='my-account-text'>
          {userType === 'vendor' && (
            <>
              <h2>Informacion adicional</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit magnis tristique est taciti congue, elementum curae justo turpis cras primis nisi tincidunt tortor mus vehicula. Suscipit ut eros viverra nulla elementum mollis facilisi natoque hac, eu arcu fringilla imperdiet ante nisi tincidunt class. Parturient nibh egestas curae hendrerit rutrum purus nec tempus vehicula pretium id luctus quam ante, metus posuere suscipit platea facilisis et erat sed viverra sagittis scelerisque enim turpis.</p>
            </>
          )}
        </div>
      </div>
      <div className="user-type-buttons">
        <button onClick={() => setUserType('vendor')}>Vendedor</button>
        <button onClick={() => setUserType('buyer')}>Comprador</button>
      </div>
    </div>
  );
}

export default MyAccountPage;
