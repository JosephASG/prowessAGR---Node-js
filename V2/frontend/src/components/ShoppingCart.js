import React, { useState } from 'react';
import './ShoppingCart.css';
import SearchBar from './SearchBar';

const initialProducts = [
    {
        nombre: 'Producto 9',
        marca: 'marca9',
        precio: 60,
        cantidad: 2,
        imagen: 'https://elegifruta.com.ar/wp-content/uploads/2017/07/manzana_roja.jpg',
    },
    {
        nombre: 'Producto 3',
        marca: 'marca2',
        precio: 20,
        cantidad: 1,
        imagen: 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/platanos_0.jpg.webp?itok=Nm5QVrwg',
    },
    {
        nombre: 'Producto 2',
        marca: 'marca3',
        precio: 25,
        cantidad: 1,
        imagen: 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/platanos_0.jpg.webp?itok=Nm5QVrwg',
    },
    // Agrega más productos si es necesario
];

const categoriesObject = {
    categoria1: "Categoría 1",
    categoria2: "Categoría 2",
    categoria3: "Categoría 3",
    // Agrega más categorías según sea necesario
};

function ShoppingCart() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [categories, setCategories] = useState(categoriesObject);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = sortOption
        ? [...filteredProducts].sort((a, b) => {
            if (sortOption === 'name') {
                return a.nombre.localeCompare(b.nombre);
            } else if (sortOption === 'price') {
                return a.precio - b.precio;
            } else if (sortOption === 'category') {
                return a.marca.localeCompare(b.marca);
            }
        })
        : filteredProducts;

    const calculateTotalPrice = () => {
        const total = sortedProducts.reduce(
            (sum, product) => sum + product.precio * product.cantidad,
            0
        );
        return total;
    };

    return (
        <div className="shopping-cart">
            <div className="presentation">
                <div className="tittle-page">
                    <h1>Carrito de compras</h1>
                </div>
                <div className="filters">
                    <SearchBar
                        searchTerm={searchTerm}
                        sortOption={sortOption}
                        handleSearch={handleSearchChange}
                        handleSortChange={handleSortChange}
                        showPriceOption={true}
                        showCategoryOption={true}
                    />
                </div>
            </div>
            <div className="shopping-cart-info">
                <div className="show-products">
                    {sortedProducts.map((product, index) => (
                        <div className='producto-cart' key={index}>
                            <div className='img-product'>
                                <img src={product.imagen} alt={product.nombre} />
                            </div>
                            <div className='name-product'>
                                <h3>{product.nombre}</h3>
                                <p><b>Categoria:</b> {product.marca}</p>
                                <p><b>Precio:</b> ${product.precio}</p>
                            </div>
                            <div className='cantidad-product'>
                                <button className='btn-add'>+</button>
                                <span className='product-amount'>{product.cantidad}</span>
                                <button className='btn-remove'>-</button>
                            </div>
                            <div className='price-product'>
                                <p><b>Total:</b> ${product.precio * product.cantidad}</p>
                                <div>
                                    <img className='btn-delete' src='https://img.icons8.com/?size=512&id=102550&format=png' alt='delete' />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="total-price">
                        <p>
                            <b>Precio Total de la Compra:</b> ${calculateTotalPrice()}
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
