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
import "jspdf-autotable";



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
    const logoUrl = 'https://media.discordapp.net/attachments/1157817962267426861/1211753563168964680/IMG-20240226-WA0095.jpg?ex=65ef5872&is=65dce372&hm=2c661c46603ac6d61382d741a1c84dbd49ce6265dda70a2dcaa28218b22e1e20& ';
    const pdf = new jsPDF();

    // Configurar estilo del texto
    pdf.setFont('times');
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0); // Color en RGB (negro)

    // Agregar el logo
    pdf.addImage(logoUrl, 'JPEG', 10, 10, 50, 20);

    // Agregar el título de la factura
    pdf.setFontSize(20);
    pdf.text('Confirmación del Pedido', 70, 30);

    // Agregar los detalles del cliente
    pdf.setFontSize(12);
    pdf.text(`Estimado/a ${usuario.nombre},`, 10, 60);
    pdf.text(`Gracias por comprar con nosotros. Tu pedido ${orderNumber} está confirmado. Te avisaremos cuando se envíe.`, 10, 70);

    // Agregar los detalles del pedido
    pdf.text('Detalles del Pedido', 10, 90);
    pdf.text(`Nº de orden: ${orderNumber}`, 10, 100);

    // Agregar los detalles de los productos en una tabla más estilizada
    let yPosition = 110;
    const tableHeaders = ['Producto', 'Cantidad', 'Vendedor'];
    const tableData = cart.map(product => [product.pro_nombre, `${product.cantidad} ${product.pro_medida}`, product.pro_vendedor]);

    pdf.autoTable({
        startY: yPosition,
        head: [tableHeaders],
        body: tableData,
        theme: 'grid',
        margin: { top: 10 }
    });

    // Mensaje adicional
    pdf.text('Quedo a la espera de cualquier confirmación o instrucciones adicionales.', 10, pdf.autoTable.previous.finalY + 10);

// Firma y enlaces tipo botón
pdf.text('Saludos cordiales,', 10, pdf.autoTable.previous.finalY + 20);
pdf.text('ProwessAgrícola', 10, pdf.autoTable.previous.finalY + 30);

// Agregar botones de enlace
const buttons = [
    { text: 'Facebook', link: 'https://www.facebook.com/profile.php?id=100094846861007&mibextid=gik2fB' },
    { text: 'Instagram', link: 'https://www.instagram.com/prowessec7?igshid=NGVhN2U2NjQ0Yg%3D%3D' },
    { text: 'Sitio Web', link: 'https://prowessec.com' },
    { text: 'TikTok', link: 'https://www.tiktok.com/@prowess.ec?is_from_webapp=1&sender_device=pc' }
];

buttons.forEach((button, index) => {
    pdf.textWithLink(button.text, 10, pdf.autoTable.previous.finalY + 40 + (index * 12), { url: button.link });
});
    // Obtener el contenido del PDF en formato base64
    const pdfBase64 = pdf.output('datauristring');

    // Construir el enlace de descarga del PDF
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfBase64;
    downloadLink.download = `${orderNumber}_confirmacion_pedido.pdf`;

    // Simular el clic en el enlace para iniciar la descarga
    downloadLink.click();

    // Enviar el correo
    window.location.href = `mailto:${usuario.email}?subject=Confirmación de Pedido&body=Adjunto encontrarás la confirmación del pedido en formato PDF.`;
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
