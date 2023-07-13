  import React from 'react';
  import { Link } from 'react-router-dom';
  import { Carousel } from 'react-responsive-carousel';
  import 'react-responsive-carousel/lib/styles/carousel.min.css';
  import './HomePage.css';
  import image1 from '../imagenes/24.png'
  import image2 from '../imagenes/info.png'
  import image3 from '../imagenes/crecimiento.png'
  function HomePage() {
    const images = [
      require('../imagenes/agr3.jpg'),
      require('../imagenes/agr2.jpg'),
      require('../imagenes/agr5.jpg'),
      require('../imagenes/agr4.jpg'),
      require('../imagenes/agr1.jpg'),
    ];

    return (
      <div className="home-page">
        <div className="home-page-content">
          <div className="home-page-subtitle">
            <h2>Productos Agrícolas 100% Naturales Y Frescos</h2>
            <p>De la mata a la olla</p>
          </div>
          <div className="home-page-carousel">
            <Carousel showThumbs={false} infiniteLoop autoPlay>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className='part2'>
          <p className='p1'>Vende y compra los mejores productos del país</p>
          <Link to="/registro">
          <button className='RegistroHome'>Registro</button>
          </Link>
        </div>
        <div className="paragraphs-container">
          <div className="paragraph">
            <img src={image1} alt="Imagen 1" />
            <p>Disponibilidad las 24 horas: Tu página web estará disponible en todo momento, lo que significa que los clientes pueden navegar y comprar tus productos en cualquier momento del día, incluso fuera del horario comercial.</p>
          </div>
          <div className="paragraph">
            <img src={image2} alt="Imagen 2" />
            <p>Información detallada: Puedes proporcionar información detallada sobre cada producto, incluyendo especificaciones, beneficios, usos, y consejos de cultivo. Esto ayuda a los clientes a tomar decisiones informadas y aumenta la confianza en tu marca.</p>
          </div>
          <div className="paragraph">
            <img src={image3} alt="Imagen 3" />
            <p>Crecimiento a largo plazo: La presencia en línea es esencial en la era digital actual. Una página web bien establecida puede contribuir al crecimiento sostenible de tu negocio agrícola a lo largo del tiempo.</p>
          </div>
        </div>
      </div>
    );
  }

  export default HomePage;
