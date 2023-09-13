import React from 'react';
import ShoppingCart from './ShoppingCart';

function ShoppingCartContainer({ cart, addToCart, removeFromCart }) {
  return (
    <div>
      <ShoppingCart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default ShoppingCartContainer;
