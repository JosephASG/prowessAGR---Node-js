import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./Terms.css";
const Terms = () => {
  return (
    <div className="wrapper">
      <header className="header-container">
        <Header />
      </header>

      {/* Main Start */}
      <main className="main-container"></main>
      <div className="terms">
        <h1>Términos y Condiciones</h1>
        <p>
          Bienvenidos a la página de Términos y Condiciones de Prowess Agricola.
          Estos términos y condiciones se aplican a todos los visitantes y
          usuarios del sitio web.
        </p>
        <h2>1. Aceptación de los Términos y Condiciones</h2>
        <p>
          Al acceder y utilizar nuestro sitio web, usted acepta estar sujeto a
          estos términos y condiciones. Si no está de acuerdo con estos términos
          y condiciones, por favor no utilice nuestro sitio web.
        </p>
        <h2>2. Propiedad Intelectual</h2>
        <p>
          Los derechos de propiedad intelectual, incluyendo, sin limitación, los
          derechos de autor, marcas comerciales, nombres comerciales y patentes,
          en y para el sitio web y su contenido, pertenecen a Prowess Agricola.
        </p>
        <h2>3. Uso del Sitio Web</h2>
        <p>
          Usted se compromete a utilizar el sitio web sólo con fines legales y
          de una manera que no infrinja los derechos de, restrinja o inhiba el
          uso y disfrute del sitio web por parte de cualquier tercero.
        </p>
        <h2>4. Exclusión de Garantías y Limitación de Responsabilidad</h2>
        <p>
          El sitio web se proporciona "tal cual" sin garantías de ningún tipo,
          ya sean expresas o implícitas. Prowess Agricola. no será
          responsable de ningún daño directo, indirecto, incidental, especial o
          consecuente que resulte del uso o la imposibilidad de uso del sitio
          web.
        </p>
        <h2>5. Modificaciones a los Términos y Condiciones</h2>
        <p>
        Prowess Agricola se reserva el derecho de modificar estos
          términos y condiciones en cualquier momento y sin previo aviso. Al
          utilizar el sitio web después de cualquier modificación, usted acepta
          estar sujeto a los términos y condiciones modificados.
        </p>
        <h2>6. Ley Aplicable y Jurisdicción</h2>
        <p>
          Estos términos y condiciones se regirán e interpretarán de acuerdo con
          las leyes de Ecuador. Cualquier disputa que surja en
          relación con estos términos y condiciones estará sujeta a la
          jurisdicción exclusiva de los tribunales de Pichincha.
        </p>
      </div>
      {/* Main End*/}

      {/* Footer Start */}
      <footer className="footer-container">
        <Footer />
      </footer>
      {/* Footer End*/}
    </div>
  );
};

export default Terms;
