//Actualizacon en el hostinger 2024/3/21
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components/General";
import Login from "./pages/Login";
import Register from "./pages/Register.js";
import { Home } from "./pages/Home";
import StorePage from "./pages/StorePage";
import ShoppingCart from "./components/ShoppingCart";
import ShoppingCartPage from "./components/ShoppingCartPage";
import VendorsPage from "./pages/VendorsPage";
import { MyAccountPage } from "./pages/Account/";
import ProductList from "./pages/ProductList";
import AboutUs from "./pages/AboutUs/AboutUs.js";
import CategoriesPage from "./pages/CategoriesPage";
import SaleDetailsPage from "./pages/SaleDetailsPage";
import SalesPage from "./pages/SalesPage";
import { getTokenData } from "./services/auth";
import PrivateRoute from "./routes/PrivateRoute";
import UserList from "./pages/UserList";
import AccessDenied from "./pages/AccessDenied";
import { Advertisement } from "./pages/Advertisement";
import PagoPage from "./pages/PagoPage";
import TermsConditions from "./pages/TermsConditions";
import PasswordReset from "./pages/PasswordReset";
import PasswordSend from "./pages//PasswordSend";
import AccountReset from "./pages/AccountReset";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("default");
  const [orden, setOrden] = useState([]);

  useEffect(() => {
    if (token !== null) {
      checkAuth(token);
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
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} role={role} orden={orden} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/advertismenet" element={<Advertisement />} />
        <Route
          path="/pago"
          element={<PagoPage token={token} />}
        />
        <Route path="/recuperar-contrasena" element={<PasswordReset />} />
        <Route path="/recuperar-cuenta" element={<AccountReset />} />
        <Route path="/password-send" element={<PasswordSend />} />

        <Route path="/tienda" element={<StorePage />} />

        <Route path="/carrito" element={<ShoppingCart setOrden={setOrden} />} />

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
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/mi-cuenta"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendedor", "cliente"]}
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
        <Route path="/terms&conditions" element={<TermsConditions />} />
        <Route
          path="/terms&conditions"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendedor"]}
              element={<TermsConditions />}
            />
          }
        />

        <Route
          path="/product-list"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendedor"]}
              element={<ProductList />}
            />
          }
        />
        <Route
          path="/sales:id"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendedor"]}
              element={<SaleDetailsPage />}
            />
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendedor"]}
              element={<SalesPage />}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/registro" element={<Register />} />
        <Route
          path="/categories"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendedor"]}
              element={<CategoriesPage />}
            />
          }
        />
        <Route path="/accessDenied" element={<AccessDenied />} />
        <Route
          path="/users"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador"]}
              element={<UserList />}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
