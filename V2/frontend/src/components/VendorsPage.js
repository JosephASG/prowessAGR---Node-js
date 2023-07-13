import React from 'react';
import './VendorsPage.css'; // Importa el archivo de estilos CSS

function VendorsPage() {
  return (
    <div className="vendors-page">
      <h1 className="vendors-page-title">Vendedores</h1>
      <div className='vendors-cards'>
        <div className='vendor-card'>
          <img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f632.png' alt='foto'></img>
            <h2 className='vendor-data'>Venderdor1 Nombre Apellido</h2>
            <h2 className='vendor-data'>Contactos: 0999999999</h2>
            <h2 className='vendor-data'>Provincia: Pichincha</h2>
            <h2 className='vendor-data'>Ciudad: Quito</h2>
        </div>
        <div className='vendor-card'>
          <img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f632.png' alt='foto'></img>
            <h2 className='vendor-data'>Venderdor1 Nombre Apellido</h2>
            <h2 className='vendor-data'>Contactos: 0999999999</h2>
            <h2 className='vendor-data'>Provincia: Pichincha</h2>
            <h2 className='vendor-data'>Ciudad: Quito</h2>
        </div>
        <div className='vendor-card'>
          <img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f632.png' alt='foto'></img>
            <h2 className='vendor-data'>Venderdor1 Nombre Apellido</h2>
            <h2 className='vendor-data'>Contactos: 0999999999</h2>
            <h2 className='vendor-data'>Provincia: Pichincha</h2>
            <h2 className='vendor-data'>Ciudad: Quito</h2>
        </div>
        <div className='vendor-card'>
          <img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f632.png' alt='foto'></img>
            <h2 className='vendor-data'>Venderdor1 Nombre Apellido</h2>
            <h2 className='vendor-data'>Contactos: 0999999999</h2>
            <h2 className='vendor-data'>Provincia: Pichincha</h2>
            <h2 className='vendor-data'>Ciudad: Quito</h2>
        </div>
        <div className='vendor-card'>
          <img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f632.png' alt='foto'></img>
            <h2 className='vendor-data'>Venderdor1 Nombre Apellido</h2>
            <h2 className='vendor-data'>Contactos: 0999999999</h2>
            <h2 className='vendor-data'>Provincia: Pichincha</h2>
            <h2 className='vendor-data'>Ciudad: Quito</h2>
        </div>
      </div>

      {/* Contenido adicional de la página de vendedores */}
    </div>
  );
}

export default VendorsPage;
