import React, { useState, useEffect } from 'react';
import './PagoPage.css';
import { Navigate } from 'react-router-dom';
import Check from '../imagenes/Check.png';
import WhatsButton from '../components/WhatsButton'; 

function PagoPage({ paymentData }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (paymentData) {
      handlePayment(paymentData.totalPrice, paymentData.products);
    }
  }, [paymentData]);

  const handlePayment = (totalPrice, products) => {
    setPaymentSuccess(true);
    console.log('Total Price:', totalPrice);
    console.log('Products:', products);
  };

  if (!paymentData || redirect) {
    return <Navigate to="/carrito" />;
  }

  const handleBuyButtonClick = () => {
    setRedirect(true);
  }

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
              <p className="pagopage-factura-datos">
                <span className="pagopage-factura-label">Nº de orden:</span>
                349646148
              </p>
              <p className="pagopage-factura-datos">
                <span className="pagopage-factura-label">Vendedor:</span>
                Maria
              </p>
              <p className="pagopage-factura-datos">
                <span className="pagopage-factura-label">Compra:</span>
                Uvas
              </p>
              <p className="pagopage-factura-datos">
                <span className="pagopage-factura-label">Cantidad:</span>
                50 Lb
              </p>
              <p className="pagopage-gracias">¡Gracias por su compra!</p>

              <WhatsButton number="0998160293" message="Hola, he completado mi compra. ¿Podemos ponernos en contacto?" /> 
              <p className="pagopage-gracias">En breve nos pondremos en contacto con usted</p>
            </div>
            <button className="btn-buy" onClick={handleBuyButtonClick}>
              <b>Seguir comprando</b>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PagoPage;
