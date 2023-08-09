import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className='AboutUsInfo'>
      <div className='about-section'>
        <h2>¿Quiénes Somos?</h2>
        <p>Somos un equipo apasionado comprometido en brindar soluciones innovadoras a nuestros clientes.</p>
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
