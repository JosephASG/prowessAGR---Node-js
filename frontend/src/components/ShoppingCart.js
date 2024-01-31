import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ShoppingCart.css';
import { Navigate } from 'react-router-dom';

function ShoppingCart({ cart, addToCart, removeFromCart, navigateToPago}) {
  const handleQuantityInput = (event, product) => {
    const inputValue = event.target.value;
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);

    updatedCart[existingProductIndex].cantidad = inputValue;
    setCartProducts(updatedCart);
  };

  const handleQuantityBlur = (event, product) => {
    const inputValue = event.target.value;
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);
  
    if (isNaN(inputValue) || inputValue < 1) {
      updatedCart[existingProductIndex].cantidad = 1;
    } else if (inputValue >= 1) {
      updatedCart[existingProductIndex].cantidad = inputValue;
    } else {
      updatedCart[existingProductIndex].cantidad = 1;
    }
  
    setCartProducts(updatedCart);
  };
  
  const [cartProducts, setCartProducts] = useState([]); 
  const [redirect, setRedirect] = useState(false);
  const handleRemoveFromCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      const existingProduct = updatedCart[existingProductIndex];
      if (existingProduct.cantidad > 1) {
        existingProduct.cantidad -= 1;
      } else {
        updatedCart.splice(existingProductIndex, 1);
      }
      setCartProducts(updatedCart);
    }
  };

  const handleBuyButtonClick = () => {
    navigateToPago(calculateTotalPrice(), addedProducts);
  }

  if (redirect) {
    return <Navigate to="/pago" />;
  }

  const handleDeleteFromCart = (product) => {
    removeFromCart(product);
  };
  const calculateTotalPrice = () => {
    if (!cart) {
      return 0;
    }
    const total = cart.reduce(
      (sum, product) => sum + product.pro_precio * product.cantidad,
      0
    );
    return total;
  };
  const addedProducts = cart ? cart.filter((product) => product.cantidad > 0) : [];
  return (
    <div className="shopping-cart">
      <div className="presentation">
        <div className="tittle-page">
          <h1>CARRITO DE COMPRAS</h1>
        </div>
      </div>
      <div className="shopping-cart-info">
        <div className="show-products">
          {addedProducts.map((product, index) => (
            <div className='producto-cart' key={index}>
              <div className='img-product'>
                <img src={product.pro_imagen} alt={product.pro_nombre} />
              </div>
              <div className='name-product'>
                <h3>{product.pro_nombre}</h3>
                <p className='separador-p'><b>Categoria:</b> {product.pro_categoria}</p>
                <p className='separador-p'><b>Precio:</b> ${product.pro_precio} x {product.pro_medida}</p>
                <p className='separador-p'><b>Cantidad disponible:</b> {product.pro_stock} {product.pro_medida}</p>
                <p className='separador-p'><b>Vendedor:</b> {product.pro_vendedor}</p>
              </div>
              <div className='cantidad-product'>
                <button className='btn-add' onClick={() => addToCart(product)}>+</button>

                <div className='cantidad'>
                  <label htmlFor="pro_stock">Cantidad</label>
                  <input
                    type="text"
                    className="cantidad-producto"
                    name="pro_stock"
                    value={product.cantidad}
                    onInput={(e) => handleQuantityInput(e, product)}
                    onBlur={(e) => handleQuantityBlur(e, product)}
                  />


                </div>
                <button className='btn-remove' onClick={() => handleRemoveFromCart(product)}>-</button>
              </div>
              <div className='price-product'>
                <p><b>Total:</b> ${(product.pro_precio * product.cantidad).toFixed(2)}</p>
                <div>
                  <FontAwesomeIcon
                    className='fa-icon-trash'
                    icon={faTrash}
                    onClick={() => handleDeleteFromCart(product)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="total-price">
            <p>
              <b>Precio Total de la Compra:</b> ${calculateTotalPrice().toFixed(2)}
            </p>
            <button className="btn-buy" onClick={handleBuyButtonClick}>
              <b>Comprar</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShoppingCart;