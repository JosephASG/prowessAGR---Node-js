import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./About.css";
const AboutUs = () => {
  return (
   <div className="wrapper">
      {/* Header Start */}
      <header className="header-container">
        <Header />
      </header>
      {/* Header End */}

      {/* Main Start */}
      <main className="main-container">
      <div className="nosotros">
          <div className="img-cont">
            <img className="img-nosotros" src="./assets/images/others/nosotros.png" alt="" />
          </div>
          <p>En esta sección podrás conocer más al respecto de quiénes somos conjuntamente con la misión y visión del proyecto realizado a su vez de la unidad de vinculación del Departamento de Ciencias Económicas, Administrativas y de Comercio - DCEA.
          </p>
          <div class="flex-container" >
            <div class="flex-item-left" >
              <img className="img-about" src="./assets/images/others/farmer.png" alt="" />
            </div>
            <div class="flex-item-right" >
              <h2>¿Quiénes somos?</h2>
              <p>Prowess Agronomía es una plataforma creada para aumentar el desarrollo y comercialización de la producción agrícola de todo el país. Nuestro equipo trabaja arduamente apara difundir el concepto de la agronomía como sistema. </p>
            </div>
          </div>
          <div class="flex-container2" >
            <div class="flex-item-left" >
              <img className="img-about" src="./assets/images/others/mision.png" alt="" />   
              
            </div>
            <div class="flex-item-right" >
            <h2>Misión</h2>
              <p>Ayudar al crecimiento económico y productivo de los agricultores, siendo Prowess Agronomía un intermediario directo con buena capacidad de negociación y desarrollo de estrategias de comercialización, el mismo que se encargara de la distribución de los productos, en buenas condiciones sin perder su calidad al momento de ser trasladados. </p> 
            </div>
          </div>
          <div class="flex-container" >
            <div class="flex-item-left" >
              <img className="img-about" src="./assets/images/others/vision.jpg" alt="" />
            </div>
            <div class="flex-item-right" >
              <h2>Visión</h2>
              <p>Al 2024 ser una plataforma estable y ser considerados por nuestros benefactores y aliados como una opción viable para comercializar sus productos a todo el país.</p>
            </div>
          </div>
          <div class="flex-container2" >
            <div class="flex-item-left" >
              <img className="img-about" src="./assets/images/others/general.png" alt="" />   
            </div>
            <div class="flex-item-right" >
              <h2>Objetivo General</h2>
              <p>Establecer alianzas con los productores para que a través de Prowess Agronomía puedan incrementar exponencialmente las ventas de sus productos agrícolas ganando así mayor mercado de consumo. </p> 
            </div>
          </div>
          <div class="flex-container" >
            <div class="flex-item-left" >
              <img className="img-about" src="./assets/images/others/especificos.png" alt="" />
            </div>
            <div class="flex-item-right" >
              <h2>Objetivos Específicos</h2>
              <ul>
                <li >Incrementar los mecanismos de comercialización de los distintos productos.</li>
                <li >Impulsar la compra y venta de productos agrícolas mediante la plataforma Prowess Agrícola.</li>
                <li >Desarrollar nuevas estrategias de negociación y comercialización con los consumidores.</li>

              </ul>
            </div>
          </div>
      </div>

      </main>
      {/* Main End*/} 



      {/* Footer Start */}
      <footer className="footer-container">
        <Footer />
      </footer>
      {/* Footer End*/}
    </div>
    
  );
};

export default AboutUs;