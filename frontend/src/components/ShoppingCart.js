import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ShoppingCart.css';

function ShoppingCart({ cart, addToCart, removeFromCart }) {

  const [cartProducts, setCartProducts] = useState([]);

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

  const handleQuantityChange = (product, newQuantity) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].cantidad = newQuantity;
      addToCart(updatedCart[existingProductIndex]);
    }
  };

  const handleCartUpdate = (product, action) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const existingProduct = updatedCart[existingProductIndex];

      if (action === 'remove') {
        if (existingProduct.cantidad > 1) {
          existingProduct.cantidad -= 1;
        } else {
          updatedCart.splice(existingProductIndex, 1);
        }
      } else if (action === 'delete') {
        updatedCart.splice(existingProductIndex, 1);
      }

      addToCart(existingProduct); 
    }
  };

  const handleRemoveOrDeleteFromCart = (product, action) => {
    handleCartUpdate(product, action);
    removeFromCart(product);
  };
  
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
          <h1>Carrito de compras</h1>
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
                    type="number"
                    className="cantidad-producto"
                    name="pro_stock"
                    onChange={(e) => handleQuantityChange(product, e.target.value)}
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
                    onClick={() => handleRemoveOrDeleteFromCart(product, 'remove')}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="total-price">
            <p>
              <b>Precio Total de la Compra:</b> ${calculateTotalPrice().toFixed(2)}
            </p>
            <button className="btn-buy">
              <b>Comprar</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
