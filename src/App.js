import React from "react";
import NavBar from "./components/inicio/NavBar";
import Inicio from "./components/inicio/Inicio";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products/Products";
import Login from "./components/Login/login";
import { CartContext, CartProvider } from './components/context/CartContext';
import ContactUs from "./components/Contactanos/ContactUs";
import Register from "./components/Login/Register/Register";
import Cart from "./components/Cart/cart.jsx";
import Producto from "./components/Products/producto.jsx";

function App() {
  return (
    <CartProvider> {/* Envuelve todo en CartProvider */}
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" exact element={<Inicio />} />
          {/* <Route path="/desayuno" element={<Products />} />
          <Route path="/almuerzo" element={<Products />} />
          <Route path="/bebidas" element={<Products />} />
          <Route path="/golosinas" element={<Products />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/producto" element={<Products />} />
          <Route path="/productos/categoria/:categoriaId" element={<Products />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} /> {/* Ruta para el carrito */}
        <Route path="/productos/categoria/:categoriaId" element={<Producto />} /> {/* Ruta para productos por categoría */}

        </Routes>
      

      </Router>
    </CartProvider>
  );
}

export default App;
