import React from "react";
import "../../SASS/style.css";
import CartaSeccion from "../InicioProductos/cartaSeccion";
import img1 from "../../img/comida/dona.avif";
import img2 from "../../img/comida/meidalunaJQ.jpg";
import img3 from "../../img/comida/cocacola.webp";
import img4 from "../../img/comida/golosinas.webp";
import { useEffect, useState} from "react";
import img8 from "../../img/burgalogo.png";
import img9 from "../../img/fritaslogo.jpg";
import { AuthContext } from "../context/AuthContext";
import Footer from "./Footer";
import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react";
import CartaMenu from "../Products/cartaMenu";
import Carousel from "./Carousel";

const Inicio = () => {
  const { darkMode  } = useContext(DarkModeContext);
  
  return (
    <div className="main-content">
      <Carousel></Carousel>
      <div className="pagina">
        <div className="cajaInicio"></div>
      </div>
      <div className={`seccion2 ${darkMode ? "dark" : "light"}`}>
        <div className="imagen-container">
          <img src={img8} alt="Imagen móvil" className="mobile-only" />
          <img src={img9} alt="Imagen móvil" className="mobile-only" />
        </div>

        <div className="titulo-seccion">
          <h3 className={`titulo ${darkMode ? "dark" : "light"}`}>
            Categorías
          </h3>
        </div>
        <div className={`seccionProd ${darkMode ? "dark" : "light"}`}>
          <div className={`cajaProds ${darkMode ? "dark" : "light"}`}>
            <CartaSeccion
              nombre={"¡Desayuno/Merienda!"}
              img={img1}
              ruta="/productos/categoria/4" 
              />
            <CartaSeccion nombre={"¡Golosinas!"} img={img4}         ruta="/productos/categoria/1" 
 />
            <CartaSeccion
              nombre={"¡Almuerzo/Cena!"}
              img={img2}
              ruta="/productos/categoria/6" 
            />
            <CartaSeccion nombre={"¡Bebidas!"} img={img3}         ruta="/productos/categoria/7" 
 />
          </div>
        </div>
      </div>
      <div className={`seccionMenu ${darkMode ? "dark" : "light"}`}>
        <h4 className={`h4 ${darkMode ? "dark" : "light"}`}>
          <span className="colorido">Menu</span> del dia
        </h4>
        <div className={`cajaMenu ${darkMode ? "dark" : "light"}`}>
          <CartaMenu categoriaId={9} 
  
      
          />
        
        </div>
        
      </div>
      
      
      <Footer />
    </div>
  );
};

export default Inicio;
