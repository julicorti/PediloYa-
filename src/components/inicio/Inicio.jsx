import React from "react";
import NavBar from "./NavBar";
import "../../SASS/style.css";
import Carousel from "./Carousel";
import CartaSeccion from "../InicioProductos/cartaSeccion";
import img1 from "../../img/comida/medialuna.jpg";
import img2 from "../../img/comida/pizza.png";
import img3 from "../../img/comida/cocacola.webp";
import img4 from "../../img/comida/rapsodia.png";
import img5 from "../../img/comida/milanesa.jpg"
import img6 from "../../img/comida/ñoquis.webp"
import img7 from "../../img/comida/sangucheB.jpg"
import Footer from "./Footer";
import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import CartaMenu from "../Products/cartaMenu";
const Inicio = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);


  return (
    <div className="main-content">
      <div className="pagina">
        <Carousel />
      </div>
      <div  className={`seccion2 ${darkMode ? "dark" : "light"}`}>
        <div className="titulo-seccion" >
          <hr className="linea" />
          <h3 className={`titulo ${darkMode ? "dark" : "light"}`}>Categorías</h3>
          <hr className="linea" />
        </div>

        <div  className={`seccionProd ${darkMode ? "dark" : "light"}`}>
          
          <div className={`cajaProds ${darkMode ? "dark" : "light"}`}>
            <CartaSeccion
              nombre={"¡Desayuno/Merienda!"}
              img={img1}
              ruta="/desayuno"
            />
            <CartaSeccion nombre={"¡Golosinas!"} img={img4} ruta="/golosinas" />
            <CartaSeccion
              nombre={"¡Almuerzo/Cena!"}
              img={img2}
              ruta="/Products"
            />
            <CartaSeccion nombre={"¡Bebidas!"} img={img3} ruta="/bebidas" />
          </div>
        </div>
      </div>
      <div  className={`seccionMenu ${darkMode ? "dark" : "light"}`}>
        <h4 className={`h4 ${darkMode ? "dark" : "light"}`}>
          <span  class="colorido" >Menu</span> del dia
        </h4>
        <div  className={`cajaMenu ${darkMode ? "dark" : "light"}`}>
          <CartaMenu img={img5} precio="25.50" desc="Milanesa con papas fritas" nombre="Milanesa"/>
          <CartaMenu img={img6} precio="25.50" desc="Ñoquis con salsa de tomate" nombre="Ñoquis"/>
          <CartaMenu img={img7} precio="25.50" desc="Sanguche de bondiola" nombre="Bondiola"/>
          <CartaMenu img={img5} precio="25.50" desc="Milanesa con papas fritas" nombre="Milanesa"/>
          <CartaMenu img={img6} precio="25.50" desc="Ñoquis con salsa de tomate" nombre="Ñoquis"/>
          <CartaMenu img={img7} precio="25.50" desc="Sanguche de bondiola" nombre="Bondiola"/>
          <CartaMenu img={img5} precio="25.50" desc="Milanesa con papas fritas" nombre="Milanesa"/>


        </div>
      </div>
         <Footer /> 
    </div>
  );
};

export default Inicio;
