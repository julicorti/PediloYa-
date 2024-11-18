import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/inicio/NavBar";
import Inicio from "./components/inicio/Inicio";
import Products from "./components/Products/Products";
import Login from "./components/Login/login";
import Register from "./components/Login/Register/Register";
import ContactUs from "./components/Contactanos/ContactUs";
import Cart from "./components/Cart/cart.jsx";
import ListaUsuarios from "./components/Admin/lista_usuarios.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";
// Importa el CartContext y el CartProvider
import { CartProvider } from './components/context/CartContext.jsx';
import { AuthContext } from "./components/context/AuthContext.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NavBarContainer />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Inicio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/productos/categoria/:categoriaId"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lista_usuarios"
              element={
                <ProtectedRoute>
                  <ListaUsuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contactus"
              element={
                <ProtectedRoute>
                  <ContactUs />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

// Contenedor del NavBar
function NavBarContainer() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  // Rutas donde el NavBar debe ocultarse
  const noNavBarRoutes = ["/login", "/register"];

  // Ocultar NavBar si la ruta actual está en noNavBarRoutes
  const hideNavBar = noNavBarRoutes.some((route) => route === location.pathname);

  return !hideNavBar && isAuthenticated ? <NavBar /> : null;
}

export default App;
