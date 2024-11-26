import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logoLight from "../../img/logo.png";
import logoDark from "../../img/logodark.png";
import Mode from "./Mode";
import "../../SASS/style.css";
import { DarkModeContext } from "../context/modeContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Iconos de carrito y perfil

const NavBar = ({ onLogout }) => {
  const { cart } = useContext(CartContext); // Consumir contexto del carrito
  const { darkMode } = useContext(DarkModeContext); // Consumir contexto del modo oscuro
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil
  const cartCount = cart.length; // Contar los ítems del carrito
  const { user, getUser, logout, isAuthenticated } = useContext(AuthContext); // Consumir el contexto de autenticación
  const [userReady, setUserReady] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú de perfil
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controlar visibilidad de

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alternar visibilidad del menú
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); // Alternar visibilidad del menú de perfil
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      getUser();
      setUserReady(true);
    }
  }, []);
  if (!isAuthenticated) {
    return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
        <div
          className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
          id="navBar"
        >
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse" id="logo">
            <Link to="/">
              <img
                src={darkMode ? logoDark : logoLight}
                alt="Logo"
                className="object-contain"

              />
            </Link>
            
          </div>

          {/* Botones a la derecha */}
          <div className="mode-container">
            <Mode />
          
            <Link to="/register">
            <button id="btn-ingresa"
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Ingresa
                  </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
  if (!userReady) {
    return <p>Cargando...</p>;
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
      <div
        className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
        id="navBar"
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
  <Link to="/">
    <img
      src={darkMode ? logoDark : logoLight}
      alt="Logo"
      className="w-20 h-4 sm:w-24 sm:h-5 md:w-32 md:h-6 lg:w-40 lg:h-8 object-contain"
    />
  </Link>
</div>

        <div className="flex items-center space-x-3 md:order-2">
          <Mode />

          
            
              <ul className="text-gray-900 dark:text-white">
               
                <li>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
          
   

          <NavLink
            to="/cart"
            className="relative flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <FaShoppingCart size={24} className="mr-2" />{" "}
          
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-center w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          

            <li>
              {user.rol === 3 ? (
                <li>
                  <NavLink
                    to="/lista_usuarios"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Usuarios
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </li>

            <li className="relative">
              {user.rol === 3 ? (
                <>
                  <NavLink
                    to="/agregar_productos"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={() => setIsMenuOpen(!isMenuOpen)} // Alternar visibilidad
                  >
                    Productos
                  </NavLink>

                </>
              ) : (
                <></>
              )}
            </li>

            <li>
              {user.rol === 3 ? (
                <li>
                  <NavLink
                    to="/formulario"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Crear Producto
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </li>
            <li>
              {user.rol === 3 ? (
                <li>
                  <NavLink
                    to="/pedidos"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Pedidos
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
