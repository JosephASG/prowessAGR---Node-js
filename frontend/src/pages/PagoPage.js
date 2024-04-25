import React, { useState, useEffect } from "react";
import "./PagoPage.css";
import { Navigate } from "react-router-dom";
import Check from "../imagenes/Check.png";
import whatsapp from "../imagenes/whatsapp.png";
import { checkToken } from "../services/auth";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { sendMail } from "../services/mailer";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function PagoPage({ clearCart }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);
  const [subtotal, setSubtotal] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [total, setTotal] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  useEffect(() => {
    const ordenActual = localStorage.getItem("ordenActual");
    if (ordenActual) {
      const ordenData = JSON.parse(ordenActual);
      setCart(ordenData.ord_productos);
      setUsuario(ordenData.ord_usuario);
      setSubtotal(ordenData.subtotal);
      setShippingPrice(ordenData.shippingPrice);
      setTotal(ordenData.total);
      const orderNum = Math.floor(Math.random() * 900000) + 100000; // Example of generating a random order number
      setOrderNumber(orderNum);
    }
  }, []);
  useEffect(() => {
    if (orderNumber && usuario) {
      enviarCorreo();
    }
  }, [orderNumber, usuario]);
  const handlePayment = () => {
    setPaymentSuccess(true);
  };

  useEffect(() => {
    handlePayment();
  }, []);

  const handleContinueShoppingClick = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/tienda" />;
  }

  const enviarCorreo = () => {
    const logoUrl =
      "https://media.discordapp.net/attachments/1157817962267426861/1217555996055048293/zyro-image_2.png?ex=66047462&is=65f1ff62&hm=229b05eccf55d81d23be809d04a26a73b7f1a5be0cf220f5a738e6b7760cd720&=&format=webp&quality=lossless&width=1252&height=587";
    const pdf = new jsPDF();

    // Configurar estilo del texto
    pdf.setFont("times"); // Cambiar a 'times'
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0); // Color en RGB (negro)

    // Agregar el logo
    pdf.addImage(logoUrl, "JPEG", 10, 10, 50, 20);

    // Agregar el título de la factura en negrita y negro
    pdf.setFont("times", "bold"); // Cambiar a 'times' y establecer el estilo en negrita
    pdf.setFontSize(22);
    pdf.setTextColor(0, 0, 0); // Negro
    pdf.text("Confirmación del Pedido", 70, 30);
    pdf.setFont("times", "normal"); // Restaurar el estilo de fuente normal

    pdf.setFontSize(12);
    pdf.text(`Estimado/a ${usuario.nombre},`, 10, 60);
    pdf.text(
      `Gracias por comprar con nosotros. Tu pedido ${orderNumber} está confirmado. Te avisaremos cuando se envíe.`,
      10,
      70
    );
    pdf.text(`Dirección de envío: ${usuario.direccion}`, 10, 80);

    // Agregar los detalles del pedido
    pdf.text("Detalles del Pedido", 10, 90);
    pdf.text(`Nº de orden: ${orderNumber}`, 10, 100);

    // Cambiar el color de la tabla a azul claro
    pdf.setFillColor(173, 216, 230); // Color azul claro

    // Definir las variables tableHeaders y tableData
    const tableHeaders = [
      "Producto",
      "Cantidad",
      "Precio Unitario",
      "Total",
      "Vendedor",
    ];
    const tableData = cart.map((product) => {
      const precio = +product.pro_precio;

      if (isNaN(precio)) {
        console.error("El precio no es un número válido:", product.pro_precio);

        return null;
      }
      return [
        { content: product.pro_nombre, styles: { fillColor: [173, 216, 230] } },
        `${product.cantidad} ${product.pro_medida}`,
        `$${precio.toFixed(2)}`,
        `$${(precio * product.cantidad + 3).toFixed(2)}`,
        product.pro_vendedor,
      ];
    });

    // Agregar la tabla con estilos personalizados
    pdf.autoTable({
      startY: 110,
      head: [tableHeaders],
      body: tableData,
      theme: "grid",
      margin: { top: 10 },
    });

    // Mensaje adicional
    pdf.setTextColor(0, 0, 0); // Negro
    pdf.text(
      "Quedo a la espera de cualquier confirmación o instrucciones adicionales.",
      10,
      pdf.autoTable.previous.finalY + 10
    );

    // Footer empresarial
    const footerHeight = 50; // Altura del footer empresarial
    const footerY = pdf.internal.pageSize.height - footerHeight;
    pdf.setFillColor(50, 50, 50);
    pdf.rect(0, footerY, pdf.internal.pageSize.width, footerHeight, "F");

    // Texto en el footer
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text(
      "ProwessAgrícola | Dr. Luis Simbaña Taipe | lesimbania@espe.edu.ec",
      10,
      footerY + 15
    );
    pdf.text(
      "Todos los derechos reservados - Prowess Ecuador © 2024 | Revisa nuestros Términos y Condiciones",
      10,
      footerY + 25
    );

    const pdfBase64 = pdf.output("datauristring").split("base64,")[1];

    const htmlContent = `
    <p>Estimado/a ${usuario.nombre},</p>
    <p>Gracias por tu compra. Adjunto encontrarás el comprobante de tu pedido.</p>
    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
    <!-- Aquí puedes incluir más contenido HTML como desees -->
  `;

    const emailData = {
      email: usuario.email,
      subject: `Confirmación de Pedido ${orderNumber}`,
      htmlContent: htmlContent,
      attachments: [
        {
          filename: `${orderNumber}_confirmacion_pedido.pdf`,
          content: pdfBase64,
          encoding: "base64",
        },
      ],
    };

     sendMail(emailData)
       .then((data) => {
         console.log("Correo enviado exitosamente:", data);
       })
       .catch((error) => {
         console.error("Error al enviar el correo:", error);
       });
  };

  const handleShareButtonClick = () => {
    const shareLink =
      "whatsapp://send?text=¡Echa un vistazo a este producto que encontré en nuestra tienda!%0A%0AEncuentra más en: https://prowessagricola.prowessec.com";
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 3000);
      })
      .catch((error) => {
        console.error("Error al copiar al portapapeles:", error);
      });
  };

  return (
    <Container className="pagopage-container">
      <Row className="pagopage-form">
        {paymentSuccess && (
          <>
            <div className="AboutUsInfo h1" style={{ marginBottom: "0px" }}>
              <h1>Su pago se ha completado correctamente</h1>
            </div>
            <img 
              src={Check} 
              alt="Imagen Pago" 
              className="pagopage-image" 
              style={{
                width: "50%", // La imagen ocupará la mitad del ancho disponible
                height: "auto", // La altura se ajustará automáticamente para mantener la relación de aspecto
                display: "block", // Para centrar la imagen
                margin: "0 auto", // Para centrar la imagen horizontalmente
                padding: "0px"
              }} 
            />
            <Container>
              {cart &&
                cart.map((product, index) => (
                  <div key={index} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid seagreen", marginBottom: "20px" }}>
                    <Row>
                      <Col md={4} sm={12}>
                        <div className="contenedor-alineado">
                          <img
                            src={product.pro_imagen}
                            alt={product.pro_nombre}
                            className="imagen-producto-factura"
                            style={{ width: "100%", height: "auto", maxWidth: "150px" }}
                          />
                        </div>
                      </Col>
                      <Col md={8} sm={12}>
                        <div className="contenedor-alineado">
                          <div>
                            <p className="datos-factura-centrada">
                              <span className="pagopage-factura-label">
                                Nº de orden:
                              </span>
                              {orderNumber}
                            </p>
                            <p className="datos-factura-centrada">
                              <span className="pagopage-factura-label">
                                Vendedor:
                              </span>
                              {product.pro_vendedor}
                            </p>
                            <p className="datos-factura-centrada">
                              <span className="pagopage-factura-label">
                                Compra:
                              </span>
                              {product.pro_nombre}
                            </p>
                            <p className="datos-factura-centrada">
                              <span className="pagopage-factura-label">
                                Cantidad:
                              </span>
                              {product.cantidad} {product.pro_medida}
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="contenedor-alineado" style={{ marginTop: "10px" }}>
                          <Button
                            className="btn btn-success btn-whatsapp"
                            href={`https://wa.me/${product.pro_numero}?text=Hola,%20he%20completado%20mi%20compra.%20¿Podemos%20ponernos%20en%20contacto%3F`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ width: "40%", marginRight: "10px", fontSize: "14px" }}
                          >
                            ¡Contáctanos!
                            <img src={whatsapp} alt="Whatsapp" style={{ maxWidth: "20px", marginLeft: "5px" }} />
                          </Button>
                          <Button
                            className="btn btn-success btn-share"
                            onClick={handleShareButtonClick}
                            style={{ width: "40%", fontSize: "14px" }}
                          >
                            Compartir
                            <i className="fab fa-whatsapp" style={{ marginLeft: "5px" }}></i>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
            </Container>
            <p className="pagopage-gracias" style={{ textAlign: "center", marginTop: "20px", color:'white' }}>
              En breve nos pondremos en contacto con usted
            </p>
            <Button onClick={handleContinueShoppingClick} style={{ display: "block", width: "200px", padding: "10px", margin: "30px auto", backgroundColor: "seagreen", color: "#fff", fontSize: "18px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              <b style={{textShadow:'none'}}>Seguir comprando</b>
            </Button>
          </>
        )}
        {showCopiedMessage && (
          <div className="copied-link-message" style={{ textAlign: "center" }}>
            <span className="copied-link-message-text" style={{color:'white'}}>
              ¡El enlace ha sido copiado al portapapeles!
            </span>
          </div>
        )}
      </Row>
    </Container>
  );
  
}

export default PagoPage;
