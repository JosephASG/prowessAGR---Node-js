import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ShoppingCart.css";
import { Navigate } from "react-router-dom";
import { createOrder } from "../services/order";
import { checkToken } from "../services/auth";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function ShoppingCart({ setOrden }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  console.log(cart);
  const [cartProducts, setCartProducts] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [usuario, setUsuario] = useState([]);
  const [inputQuantity, setInputQuantity] = useState("");
  const token = localStorage.getItem("token");

  const handleQuantityInput = (event, product) => {
    let inputValue = parseInt(event.target.value);
    console.log("CANTIDAD INPUT ->" + inputQuantity);
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    // Si inputValue es NaN, establece el valor a 1
    if (isNaN(inputValue)) {
      inputValue = 1;
    } else if (inputValue > product.pro_stock) {
      inputValue = product.pro_stock;
    }

    updatedCart[existingProductIndex].cantidad = inputValue;
    setInputQuantity(inputValue);
    setCartProducts(updatedCart);
  };

  const handleAddButton = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedCart[existingProductIndex];
      if (existingProduct.pro_cantidad_cart < product.pro_stock) {
        existingProduct.pro_cantidad_cart += 1;
      }
    } else {
      updatedCart.push({ ...product, pro_cantidad_cart: 1 });
    }

    setCartProducts(updatedCart);
  };

  useEffect(() => {
    if (token !== null) {
      obtenerDatos();
    }
  }, []);

  const obtenerDatos = async () => {
    const data = await checkToken(token);
    const usuario = {
      id: data.data.id,
      nombre: data.data.name,
      apellido: data.data.lastname,
      email: data.data.email,
      telefono: data.data.cellphone,
      direccion: data.data.address,
    };
    console.log(usuario);
    setUsuario(usuario);
  };

  const handleQuantityBlur = (event, product) => {
    let inputValue = parseInt(event.target.value);
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (isNaN(inputValue)) {
      inputValue = 1;
    } else if (inputValue > product.pro_stock) {
      inputValue = product.pro_stock;
    } else if (inputValue < 1) {
      inputValue = 1;
    }

    updatedCart[existingProductIndex].pro_cantidad_cart = inputValue;
    setInputQuantity(inputValue);
    setCartProducts(updatedCart);
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const existingProduct = updatedCart[existingProductIndex];
      if (existingProduct.pro_cantidad_cart > 1) {
        existingProduct.pro_cantidad_cart -= 1;
      } else {
        updatedCart.splice(existingProductIndex, 1);
      }
      setInputQuantity(existingProduct.pro_cantidad_cart);
      setCartProducts(updatedCart);
    }
  };

  const handleBuyButtonClick = async () => {
    try {
      var orden = calculateTotalPrice();
      orden.ord_productos = cart;
      orden.ord_usuario = usuario;
      orden.ord_fecha = new Date();

      console.log(orden);

      setOrden(orden);

      const response = await comprar(orden);

      guardarOrdenEnLocalStorage(orden);

      localStorage.removeItem("cart");

      setRedirect(true);
    } catch (error) {
      console.error("Error en el proceso de compra:", error);
    }
  };

  const comprar = async () => {
    var orden = calculateTotalPrice();
    orden.ord_productos = cart;
    orden.ord_usuario = usuario;
    orden.ord_fecha = new Date();
    console.log(orden);
    setOrden(orden);
    const response = await createOrder(orden);
    return response;
  };

  const guardarOrdenEnLocalStorage = (orden) => {
    try {
      const ordenEnString = JSON.stringify(orden);
      localStorage.setItem("ordenActual", ordenEnString);
    } catch (error) {
      console.error("Error al guardar la orden en localStorage:", error);

      alert("No se pudo guardar la orden. Por favor, intenta de nuevo.");
    }
  };
  if (redirect) {
    window.location.href = "/pago";
  }

  //Apartado que elimina los productos del carrito
  const handleDeleteFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    if (!cart) {
      return {
        subtotal: "0.00",
        shippingPrice: "3.00",
        total: "3.00",
      };
    }

    const subtotal = cart.reduce(
      (sum, product) => sum + product.pro_precio * product.pro_cantidad_cart,
      0
    );

    const shippingPrice = 3;

    const total = subtotal + shippingPrice;

    return {
      subtotal: subtotal.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      total: total.toFixed(2),
    };
  };
  
  const addedProducts = cart
    ? cart.filter((product) => product.pro_cantidad_cart > 0)
    : [];

  const totalPrice = calculateTotalPrice().total;

return (
  <Container className="shopping-cart">
    <Container className="presentation">
      <h1 style={{ textShadow: "none", color: "white" }}>CARRITO DE COMPRAS</h1>
    </Container>
    <Container className="shopping-cart-info">
      <Row className="show-products">
        {cart.map((product, index) => (
          <Col key={index} xs={12} md={6} lg={3}>
            <div className="producto-cart">
              <div className="img-product">
                <img src={product.pro_imagen} alt={product.pro_nombre} />
              </div>
              <div className="name-product">
                <h3>{product.pro_nombre}</h3>
                <p className="separador-p">
                  <b style={{ textShadow: "none", color: "black" }}>Categoria:</b> {product.pro_categoria}
                </p>
                <p className="separador-p">
                  <b style={{ textShadow: "none", color: "black" }}>Precio:</b> ${product.pro_precio} x {product.pro_medida}
                </p>
                <p className="separador-p">
                  <b style={{ textShadow: "none", color: "black" }}>Cantidad disponible:</b> {product.pro_stock}{' '}
                  {product.pro_medida}
                </p>
                <p className="separador-p">
                  <b style={{ textShadow: "none", color: "black" }}>Vendedor:</b> {product.pro_vendedor}
                </p>
              </div>
              <div className="cantidad-product">
                <Button
                  className="btn-add"
                  onClick={() => {
                    handleAddButton(product);
                  }}
                >
                  +
                </Button>
                <div className="cantidad">
                  <Form.Group controlId="pro_stock">
                    <Form.Label style={{ textShadow: "none", color: "black" }}>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max={product.pro_stock}
                      className="cantidad-producto"
                      name="pro_stock"
                      value={product.pro_cantidad_cart}
                      onInput={(e) => handleQuantityInput(e, product)}
                      onBlur={(e) => handleQuantityBlur(e, product)}
                    />
                  </Form.Group>
                </div>
                <Button
                  className="btn-remove"
                  onClick={() => handleRemoveFromCart(product)}
                >
                  -
                </Button>
              </div>
              <div className="price-product">
                <p>
                  <b style={{ textShadow: "none", color: "black" }}>Total:</b> ${(
                    product.pro_precio * product.pro_cantidad_cart
                  ).toFixed(2)}
                </p>
                <div className="trash-bin-img">
                  <FontAwesomeIcon
                    className="fa-icon-trash"
                    icon={faTrash}
                    onClick={() => handleDeleteFromCart(product)}
                  />
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="total-price" style={{ marginTop: '20px' }}>
        <p>
          <span style={{ display: 'block' }}>
            <b style={{ textShadow: "none", color: "black" }}>Subtotal:</b> $ {calculateTotalPrice().subtotal}
          </span>
          <span style={{ display: 'block' }}>
            <b style={{ textShadow: "none", color: "black" }}>Precio envío:</b> ${calculateTotalPrice().shippingPrice}
          </span>
          <span style={{ display: 'block' }}>
            <b style={{ textShadow: "none", color: "black" }}>Total a pagar:</b> ${calculateTotalPrice().total}
          </span>
        </p>
      </div>

      {addedProducts.length > 0 && (
        <Button className="btn-buy" style={{border:'none'}} onClick={handleBuyButtonClick}>
          <b style={{ textShadow: "none", color: "white" }}>Generar compra</b>
        </Button>
      )}
    </Container>
  </Container>
);

}

export default ShoppingCart;
