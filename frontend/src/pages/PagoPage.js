import React, { useState, useEffect } from 'react';
import './PagoPage.css';
import { Navigate } from 'react-router-dom';
import Check from '../imagenes/Check.png';
import WhatsButton from '../components/WhatsButton';
import ModalEditVendors from '../components/ModalEditVendors';
import VendorsPage from './VendorsPage';
import { getTokenData } from '../services/auth';
import { getUserData } from '../services/user.js';
import whatsapp from '../imagenes/whatsapp.png';
import { checkToken} from '../services/auth';  
import jsPDF from 'jspdf';



function PagoPage({ cart, vendor, clearCart, orden }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await checkToken(token);
      const usuario = 
      { 
        id: data.data.id,
        nombre: data.data.nombreUsuario,
        apellido: data.data.apellidoUsuario,
        email: data.data.correoUsuario,
        telefono: data.data.telefonoUsuario
      }
      setUsuario(usuario);
    };

    obtenerDatos();
  }, [token]);


  useEffect(() => {
    const orderNum = generateRandomOrderNumber();
    setOrderNumber(orderNum);
  }, []);

  useEffect(() => {
    handlePayment();
  }, []);

  const handlePayment = () => {
    setPaymentSuccess(true);
  };

  const [redirect, setRedirect] = useState(false);

  const handleBuyButtonClick = () => {
    setRedirect(true);
  };
  
  const generateRandomOrderNumber = () => {
    return Math.floor(Math.random() * 900000) + 100000;
  };

  if (redirect) {
    return <Navigate to="/tienda" />;
  }
  
  const handleContinueShoppingClick = () => {
    clearCart();
    setRedirect(true);
  };

  

  const enviarCorreo = () => {
      // Asegúrate de tener una función para obtener el número de orden
  
      // Crear instancia de jsPDF
      const pdf = new jsPDF();
  
      // Configurar estilo del texto
      pdf.setFont('times');
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Color en RGB (negro)
  
      // Agregar el contenido del PDF
      pdf.text('Confirmación del pedido', 10, 20);
  
      pdf.text(`Estimado/a ${usuario.nombre},`, 10, 30);
  
      pdf.text(`Gracias por comprar con nosotros. Tu pedido ${orderNumber} está confirmado. Te avisaremos cuando se envíe.`, 10, 40);
  
      pdf.text('Detalles del pedido', 10, 60);
      // Hora y fecha
      // ...
  
      pdf.text(`Nº de orden: ${orderNumber}`, 10, 70);
      pdf.text(`Quedo a la espera de cualquier confirmación o instrucciones adicionales.`, 10, 80);
  
      // Agregar detalles de productos
      let yPosition = 90; // Posición inicial para los detalles de productos
      cart.forEach(product => {
          pdf.text(`Compra: ${product.pro_nombre} - Cantidad: ${product.cantidad} ${product.pro_medida} - Comprado a: ${product.pro_vendedor}`, 10, yPosition);
          yPosition += 10; // Incrementar la posición para el siguiente producto
      });
  
      pdf.text('Saludos cordiales,', 10, yPosition + 10);
      pdf.text('https://www.ejemplo.com', 10, yPosition + 20);
  
      // Obtener el contenido del PDF en formato base64
      const pdfBase64 = pdf.output('datauristring');
  
      // Construir el enlace de descarga del PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfBase64;
      downloadLink.download = `${orderNumber}_confirmacion_pedido.pdf`;
  
      // Simular el clic en el enlace para iniciar la descarga
      downloadLink.click();
  
      // Enviar el correo
      window.location.href = `mailto:${usuario.email}?subject=Asunto&body=Adjunto encontrarás la confirmación del pedido en formato PDF.`;
  };
  

  const handleShareButtonClick = () => {
    const shareLink = 'whatsapp://send?text=¡Echa un vistazo a este producto que encontré en nuestra tienda!%0A%0AEncuentra más en: https://prowessagricola.prowessec.com';
    navigator.clipboard.writeText(shareLink).then(() => {
      setShowCopiedMessage(true); // Mostrar el mensaje de enlace copiado
      setTimeout(() => setShowCopiedMessage(false), 3000); // Ocultar el mensaje después de 3 segundos
    }).catch(error => {
      console.error('Error al copiar al portapapeles:', error);
    });
  };
  
  return (
    <div className="pagopage-container">
      <div className="pagopage-form">
        {paymentSuccess && (
          <>
            <div className='AboutUsInfo h1'>
              <h1>Su pago se ha completado correctamente</h1>
            </div>
            <div className="pagopage-factura-container">
              <img src={Check} alt="Imagen Pago" className="pagopage-image" />
              {cart && cart.map((product, index, vendor) => (
                <div key={index}>
                  
                  <p className="pagopage-factura-datos">
                    <div className='img-producto-factura'>
                      <img src={product.pro_imagen} alt={product.pro_nombre} />
                    </div>
                    <span className="pagopage-factura-label">Nº de orden:</span>
{orderNumber}
                  </p>
                  <p className="pagopage-factura-datos">
                    <span className="pagopage-factura-label">Vendedor:</span>
                    {product.pro_vendedor}
                  </p>
                  <p className="pagopage-factura-datos">
                    <span className="pagopage-factura-label">Compra:</span>
                    {product.pro_nombre}
                  </p>
                  <p className="pagopage-factura-datos">
                    <span className="pagopage-factura-label">Cantidad:</span>
                    {product.cantidad} {product.pro_medida}
                  </p>
                  <p className="pagopage-gracias">¡Gracias por su compra!</p>
                  <a href={`https://wa.me/${product.pro_numero}?text=Hola,%20he%20completado%20mi%20compra.%20¿Podemos%20ponernos%20en%20contacto%3F`} 
                  target="_blank" rel="noopener noreferrer">
                   <button className="btn btn-success btn-whatsapp">
                   <i className="fab fa-whatsapp"></i> ¡Contáctanos! <div className="image-whatsapp">
                  <img src={whatsapp} alt="Whatsapp" />
                   </div>
                  </button>
                  </a>
                  <button className="btn btn-success btn-share" onClick={handleShareButtonClick}>
                    <i className="fab fa-whatsapp"></i> Compartir 
                    <div className="image-whatsapp"></div>
                  </button>
                  <p className="pagopage-factura-datos"></p>
                </div>
              ))}
                  <button className="boton-enviar" onClick={enviarCorreo}>Enviar correo</button>
                   <p className="pagopage-gracias">En breve nos pondremos en contacto con usted</p>            
                   </div>
                  <button className="btn-buy" onClick={handleContinueShoppingClick}>
              <b>Seguir comprando</b>
            </button>
          </>
        )}
        {showCopiedMessage && (
          <div className="copied-link-message">
            <span className="copied-link-message-text">¡El enlace ha sido copiado al portapapeles!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PagoPage;
