import "../../SASS/style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartaMenu from "../Products/cartaMenu";
import { DarkModeContext } from "../context/modeContext";

import { useContext } from "react";
const CartaSeccion = ({ nombre, img, ruta }) => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

        return (
        <div>
            <div  className={`cartaSeccion ${darkMode ? "dark" : "light"}`}>
                <img className="imgColor" src={img}  />
                <div className="contenido">
                    <h1 className={`h1 ${darkMode ? "dark" : "light"}`}>{nombre}</h1>
                   
                    <Link className={`btn-c ${darkMode ? "dark" : "light"}`} to={ruta}>Ir</Link>
                </div>
            </div>
        </div>
    )
}

export default CartaSeccion;
