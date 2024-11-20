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
const NavBar = ({ onLogout }) => {
  const { cart } = useContext(CartContext); // Consumir contexto del carrito
  const { darkMode } = useContext(DarkModeContext); // Consumir contexto del modo oscuro
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil
  const cartCount = cart.length; // Contar los ítems del carrito
  const { user, getUser, logout } = useContext(AuthContext); // Consumir el contexto de autenticación
  const [userReady, setUserReady] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alternar visibilidad del menú
  };

    

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token){
      getUser();
      setUserReady(true);
    }
    
  }, []);

  
  if (!userReady) {
    return <p>Cargando...</p>
  }   
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4" id="navBar">
        {/* Logo */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to="/">
            <img src={darkMode ? logoDark : logoLight} alt="Logo" className="w-32 h-5 object-contain" />
          </Link>
        </div>

        {/* Botones a la derecha */}
        <div className="flex items-center space-x-3 md:order-2">
          <button
            id="pedilo"
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Pedí y Retirá
          </button>
          <button
           onClick = {logout}
            id="pedilo"
            type="button"
        class="btn btn-secondary"
          >
          Cerrar sesión
          </button>
              
              <Mode />
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
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Menú de navegación */}
        <div className={`items-center justify-center w-full md:flex md:w-auto md:order-1 ${isOpen ? "block" : "hidden"}`} id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Inicio
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="/ContactUs"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contactanos
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="/cart"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Carrito ({cartCount})
              </NavLink>
            </li>
            
            <li>
              {user.rol === 3 ?
                <li>
                <NavLink
                to="/lista_usuarios"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Usuarios
              </NavLink>
              </li> : <></>
              }
            
            </li>
            <li>
              {user.rol === 3 ?
                <li>
                <NavLink
                to="/agregar_productos"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
               Productos
              </NavLink>
              </li> : <></>
              }
            
            </li>
            <li>
              {user.rol === 3 ?
                <li>
                <NavLink
                to="/pedidos"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Pedidos
              </NavLink>
              </li> : <></>
              }
            
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
