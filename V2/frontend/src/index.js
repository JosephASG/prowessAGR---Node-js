import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer'; // Importa el componente Footer
import HomePage from './components/HomePage';
import StorePage from './components/StorePage';
import VendorsPage from './components/VendorsPage';
import MyAccountPage from './components/MyAccountPage';
import ShoppingCart from './components/ShoppingCart';

ReactDOM.render(
  <Router>
    <NavigationBar />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tienda" element={<StorePage />} />
      <Route path="/vendedores" element={<VendorsPage />} />
      <Route path="/mi-cuenta" element={<MyAccountPage />} />
      <Route path="/carrito" element={<ShoppingCart />} />
    </Routes>

    <Footer /> {/* Agrega el componente Footer */}
  </Router>,
  document.getElementById('root')
);
