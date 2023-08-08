import React, { useState } from 'react';
import './StorePage.css';
import SearchBar from './SearchBar';

function StorePage() {
  const [categories, setCategories] = useState([
    'Frutas',
    'Verduras',
    'Cereales',
    'Hortalizas',
    // Agrega más categorías según sea necesario
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Producto 1',
      price: 10.99,
      image: 'https://s2.ppllstatics.com/diariovasco/www/multimedia/202106/04/media/cortadas/platano-kUyC-RCIEbjdcaFn9Yc7KKpofzYN-1248x770@Diario%20Vasco-DiarioVasco.jpg',
      description: 'Descripción del producto 1',
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 19.99,
      image: 'https://example.com/product2.jpg',
      description: 'Descripción del producto 2',
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 5.99,
      image: 'https://example.com/product3.jpg',
      description: 'Descripción del producto 3',
    },
    {
      id: 4,
      name: 'Producto 4',
      price: 6.99,
      image: 'https://example.com/product3.jpg',
      description: 'Descripción del producto 4',
    },
    {
      id: 5,
      name: 'Producto 5',
      price: 6.99,
      image: 'https://example.com/product3.jpg',
      description: 'Descripción del producto 5',
    },
    {
      id: 6,
      name: 'Producto 6',
      price: 6.99,
      image: 'https://www.recetasnestlecam.com/sites/default/files/2022-04/tipos-de-manzana-royal-gala.jpg',
      description: 'Descripción del producto 6',
    },
    {
      id: 7,
      name: 'Producto 7',
      price: 19.99,
      image: 'https://example.com/product7.jpg',
      description: 'Descripción del producto 7',
    },
    {
      id: 8,
      name: 'Producto 8',
      price: 5.99,
      image: 'https://example.com/product3.jpg',
      description: 'Descripción del producto 8',
    },
    {
      id: 9,
      name: 'Producto 9',
      price: 6.99,
      image: 'https://example.com/product3.jpg',
      description: 'Descripción del producto 9',
    },
    {
      id: 10,
      name: 'Producto 10',
      price: 6.99,
      image: 'https://example.com/product3.jpg',
      description: 'Descripción del producto 10',
    },
    {
      id: 11,
      name: 'Producto 10',
      price: 6.99,
      image: 'https://example.com/product3.jpg',
      description: 'Descripción del producto 10',
    },
    // Agrega más productos según sea necesario
  ]);

  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const addToCart = (productId) => {
    console.log(`Producto agregado al carrito: ${productId}`);
  };

  const showProductDetails = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      console.log(`Detalles del producto ${productId}:`, product);
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'price') {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="store-page">
      <SearchBar
        searchTerm={searchTerm}
        sortOption={sortOption}
        handleSearch={handleSearch}
        handleSortChange={handleSortChange}
      />
      <div className="product-list">
        <div className="product-list-header">
          <div className="sidebar">
            <h2>Categorías</h2>
            <ul>
              {categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='products-container'>
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Precio: ${product.price}</p>
              <div className="product-actions">
                <button onClick={() => addToCart(product.id)}>Agregar al carrito</button>
                <span className="product-info-icon" onClick={() => showProductDetails(product.id)}>
                  ℹ️
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="product-list-footer">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <span
              key={pageNumber}
              className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          ))}
        </div>
    </div>
  );
}

export default StorePage;



//PARTE PARA CUANDO LA BASE DE DATOS ESTE LISTA
/*
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './StorePage.css'; // Importa el archivo de estilos CSS

// Configura la conexión a Firebase
const firebaseConfig = {
  // Configura tu información de conexión a Firebase
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

function StorePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtiene las categorías desde Firebase
    const categoriesRef = firebase.database().ref('categories');
    categoriesRef.on('value', (snapshot) => {
      const categoriesData = snapshot.val();
      const categoriesArray = Object.keys(categoriesData).map((categoryId) => ({
        id: categoryId,
        name: categoriesData[categoryId].name,
      }));
      setCategories(categoriesArray);
    });

    // Obtiene los productos desde Firebase
    const productsRef = firebase.database().ref('products');
    productsRef.on('value', (snapshot) => {
      const productsData = snapshot.val();
      const productsArray = Object.keys(productsData).map((productId) => ({
        id: productId,
        name: productsData[productId].name,
        price: productsData[productId].price,
      }));
      setProducts(productsArray);
    });
  }, []);

  const addToCart = (productId) => {
    console.log(`Producto agregado al carrito: ${productId}`);
  };

  return (
    <div className="store-page">
      <h1 className="store-page-title">Tienda</h1>

      <div className="sidebar">
        <h2>Categorías</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <button onClick={() => addToCart(product.id)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorePage;
*/