import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components/General";
import Login from "./pages/Login";
import Register from "./pages/Register/Register.js";
import { Home } from "./pages/Home";
import StorePage from "./pages/StorePage";
import ShoppingCart from "./components/ShoppingCart";
import ShoppingCartPage from "./components/ShoppingCartPage";
import VendorsPage from "./pages/Vendors/VendorsPage";
import { MyAccountPage } from "./pages/Account/";
import VendedorAccountPage from "./pages/Account/VendedorAccountPage"; // Importar la página del vendor
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
import AccountReset from "./pages/AccountReset";
import NotFoundPage from "./components/General/404";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("default");
  const [orden, setOrden] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole || "default");
    } else {
      setRole("none");
    }
  }, []);

  useEffect(() => {
    if (token) {
      checkAuth(token);
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
        <Route path="/pago" element={<PagoPage token={token} />} />
        <Route path="/recuperar-contrasena" element={<PasswordReset />} />
        <Route path="/recuperar-cuenta" element={<AccountReset />} />

        <Route path="/tienda" element={<StorePage />} />

        <Route path="/carrito" element={<ShoppingCart setOrden={setOrden} />} />

        <Route
          path="/vendedores"
          element={
            <PrivateRoute
              allowedRoles={["administrador", "vendor"]}
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
              allowedRoles={["administrador", "vendor", "cliente"]}
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
          path="/cuenta-vendor" // Nueva ruta para la cuenta del vendor
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["vendor"]}
              element={
                <VendedorAccountPage
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
          path="/product-list"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendor"]}
              element={<ProductList />}
            />
          }
        />
        <Route
          path="/sales:id"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendor"]}
              element={<SaleDetailsPage />}
            />
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendor"]}
              element={<SalesPage />}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} setRole={setRole} />}
        />

        <Route path="/registro" element={<Register />} />
        <Route
          path="/categories"
          element={
            <PrivateRoute
              userRole={role}
              allowedRoles={["administrador", "vendor"]}
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
