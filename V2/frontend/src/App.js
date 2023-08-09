import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import Register from './components/Register.js';
import HomePage from './components/HomePage';
import StorePage from './components/StorePage';
import VendorsPage from './components/VendorsPage';
import MyAccountPage from './components/MyAccountPage';
import ShoppingCart from './components/ShoppingCart';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer'; // Importa el componente Footer

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <NavigationBar />
      {isLoggedIn ? (
        <>
          <HomePage />
          <StorePage />
          <VendorsPage />
          <AboutUs />
          <MyAccountPage />
          <ShoppingCart />
        </>
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
