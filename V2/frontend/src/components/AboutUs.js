import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className='AboutUsInfo'>
      <div className='about-section'>
        <h2>¿Quiénes Somos?</h2>
        <p>Somos un equipo apasionado comprometido en brindar soluciones innovadoras a nuestros clientes.</p>
      </div>

      <div className='product-item'>
        <img src="imagen1.jpg" alt="Producto 1" className='product-image' />
        <h3>Producto 1</h3>
        <p>Descripción del producto 1</p>
      </div>

      <div className='product-item'>
        <img src="imagen2.jpg" alt="Producto 2" className='product-image' />
        <h3>Producto 2</h3>
        <p>Descripción del producto 2</p>
      </div>

      <div className='product-item'>
        <img src="imagen3.jpg" alt="Producto 3" className='product-image' />
        <h3>Producto 3</h3>
        <p>Descripción del producto 3</p>
      </div>

      <div className='about-section'>
        <h2>Nuestra Misión</h2>
        <p>Nuestra misión es ofrecer productos y servicios de alta calidad que superen las expectativas de nuestros clientes.</p>
      </div>

      <div className='about-section'>
        <h2>Valores Fundamentales</h2>
        <p>Nos regimos por la integridad, la excelencia y la dedicación en todo lo que hacemos.</p>
      </div>
    </div>
  );
}

export default AboutUs;
