import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLock,
  faShoppingBag,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "../../pages/home/home.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import {useRef} from "react";
import "./header.css"
const Header = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, wish } = state;

  const signouthandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    alert("¡Tu sesión ha terminado correctamente!");
    navigate("/login");
  };

  const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
  <>
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img
              className="header-logo-image"
              src="./assets/images/others/prowess-logo1.png"
              alt=""
            />
          </Link>
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/shop"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Tienda
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/sellers"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Vendedores
            </NavLink>
          </li>
        </ul>
          
        <ul className={click ? "nav-account active" : "nav-account"}>
          {userInfo && (
            <>
              <div className="header-action">
                <Link to="/" >
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </div>
               
              <div className="header-action">
                <Link to="/account" >
                  <FontAwesomeIcon icon={faUser} />               
                </Link>
              </div>

              <div className="header-action">
                <Link to="/cart" >
                  <FontAwesomeIcon icon={faShoppingBag} />
                  {cart.cartItems.length ? (
                    <span className="header-cart-badge">
                      {cart.cartItems.length}
                    </span>
                  ) : (
                    <span className="header-cart-badge">0</span>
                  )}
                </Link> 
              </div>
            </>
          )}

          {userInfo ? (
           <div className="header-action">
              <span className="logout" onClick={signouthandler} >
                <FontAwesomeIcon icon={faLock} /> 
              <span className="salir">Salir</span>
             </span>
            </div>   
          ) : (
          <NavLink
            exact
            to="/login"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Inicio Sesión
          </NavLink>
          )}
          
        </ul>
          
        <div className="nav-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </nav>
  </>

  );
};

export default Header;
