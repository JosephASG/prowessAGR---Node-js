import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Register from "./pages/Register.js";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import ShoppingCart from "./components/ShoppingCart";
import ShoppingCartPage from "./components/ShoppingCartPage";
import VendorsPage from "./pages/VendorsPage";
import MyAccountPage from "./pages/MyAccountPage";
import ProductList from "./pages/ProductList";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import CategoriesPage from "./pages/CategoriesPage";
import SaleDetailsPage from "./pages/SaleDetailsPage";
import SalesPage from "./pages/SalesPage";
import { getTokenData } from "./services/auth";
import PrivateRoute from "./routes/PrivateRoute";
import AccessDenied from "./pages/AccessDenied";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("default");

  useEffect(() => {
    if (token !== null) {
      checkAuth(token);
      setIsLoggedIn(true);
    }
    if (token === null) {
      if (localStorage.getItem("token") !== null) {
        setToken(localStorage.getItem("token"));
      } else {
        setRole("none");
      }
    }
  }, [token]);

  const checkAuth = async (token) => {
    let response = await getTokenData(token);
    if (response && response.data) {
      const data = response.data;
      setRole(data.data.rol);
    } else {
      console.log("No se encontró 'response.data'");
    }
  };
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      const existingProduct = updatedCart[existingProductIndex];
      existingProduct.cantidad += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, cantidad: 1 }]);
    }
  };

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter((product) => product !== productToRemove);
    console.log("App", updatedCart);
    setCart(updatedCart);
  };

  return (
    <Router>
      <NavigationBar isLoggedIn={isLoggedIn} role={role} cart={cart}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tienda"
          element={
            <StorePage
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/carrito"
          element={
            <ShoppingCart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/carrito-pagina"
          element={
            <ShoppingCartPage
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/vendedores"
          element={
            <PrivateRoute
              allowedRoles={["administrador", "vendedor"]}
              userRole={role}
              element={<VendorsPage />}
            />
          }
        />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route
          path="/mi-cuenta"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={[
                "administrador",
                "vendedor",
                "cliente"
              ]}
              element={
                <MyAccountPage
                  userRole={role}
                  setRole={setRole}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
          }
        />
        <Route
          path="/product-list"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={[
                "administrador",
              ]}
              element={<ProductList />}
            />
          }
        />
        <Route path="/sales:id"          
         element={
            <PrivateRoute
              userRole={role}
              allowedRoles={[
                "administrador","vendedor"
              ]}
              element={<SaleDetailsPage />}
            />
          } />
        <Route path="/sales" element={
            <PrivateRoute
              userRole={role}
              allowedRoles={[
                "administrador","vendedor"
              ]}
              element={<SalesPage />}
            />
          } /> 
        <Route
          path="/login"
          element={<Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/registro" element={<Register />} />
        <Route path="/categories" element={
            <PrivateRoute
              userRole={role}
              allowedRoles={[
                "administrador"
              ]}
              element={<CategoriesPage />}
            />
          } /> 
        <Route path="/accessDenied" element={<AccessDenied />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
