import React, {  useContext } from "react";
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
import AdminRoute from "./adminRoute.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";
import Pedidos from "./components/Admin/pedidos.jsx";
import { CartProvider } from './components/context/CartContext.jsx';
import { AuthContext } from "./components/context/AuthContext.jsx";
import AgregarProductos from "./components/Admin/agregar_productos.jsx";
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
                  <AdminRoute>
                    <ListaUsuarios />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
              <Route
              path="/agregar_productos"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AgregarProductos />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pedidos"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                  <Pedidos></Pedidos>
                  </AdminRoute>
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
  const { isAuthenticated } = useContext(AuthContext); // Acceder al contexto

  const noNavBarRoutes = ["/login", "/register"];
  const hideNavBar = noNavBarRoutes.some((route) => route === location.pathname);

  // Si el usuario está autenticado y no está en las rutas de login/register, mostramos el NavBar
  return !hideNavBar && isAuthenticated ? <NavBar /> : null;
}

export default App;
