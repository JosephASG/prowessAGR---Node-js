import React, { useState } from 'react';
import './ShoppingCart.css'; // Importa el archivo de estilos CSS

const initialProducts = [
  {
    nombre: 'Producto 1',
    precio: 10,
    cantidad: 2,
    imagen: 'https://elegifruta.com.ar/wp-content/uploads/2017/07/manzana_roja.jpg',
  },
  {
    nombre: 'Producto 2',
    precio: 20,
    cantidad: 1,
    imagen: 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/platanos_0.jpg.webp?itok=Nm5QVrwg',
  },
  // Agrega más productos si es necesario
];

function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shopping-cart">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className='show-products'>
        {filteredProducts.map((product, index) => (
          <div className='producto-cart' key={index}>
            <img src={product.imagen} alt={product.nombre} />
            <div className='info-product'>
              <h3>{product.nombre}</h3>
              <p>Precio: ${product.precio}</p>
              <p>Cantidad: {product.cantidad}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingCart;
