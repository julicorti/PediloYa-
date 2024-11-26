import React from "react";
import "../../SASS/style.css";
import CartaSeccion from "../InicioProductos/cartaSeccion";
import img1 from "../../img/comida/dona.avif";
import img2 from "../../img/empanadas.jpeg";
import img3 from "../../img/cocacola.jpg";
import img4 from "../../img/candy.jpg";
import { useEffect, useState } from "react";
import img8 from "../../img/burgalogo.png";
import img9 from "../../img/fritaslogo.jpg";
import { AuthContext } from "../context/AuthContext";
import Footer from "./Footer";
import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react";
import CartaMenu from "../Products/cartaMenu";
import Carousel from "./Carousel";
import img5 from "../../img/dish.png";
import img6 from "../../img/fast-food.png";
import img7 from "../../img/chef.png";
import img10 from "../../img/kitchen.png";


const Inicio = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="main-content">
      <Carousel></Carousel>
      <div className="pagina">
        <div className="cajaInicio"></div>
      </div>
      <div className={`seccion2 ${darkMode ? "dark" : "light"}`}>
   
      
        <section class={`quienes-somos ${darkMode ? "dark" : "light"}`}>
          <div class="icon-container">
            <div class="icon">
              <img src={img5} alt="Icono Comida" />
            </div>
            <div class="icon">
              <img src={img6} alt="Icono Bebida" />
            </div>
            <div class="icon">
              <img src={img7} alt="Icono Pan" />
            </div>
            <div class="icon">
              <img src={img10} alt="Icono Pan" />
            </div>
          </div>
          <div class={`contenido ${darkMode ? "dark" : "light"}`}>
          <div class={`titulo ${darkMode ? "dark" : "light"}`}>Quiénes Somos</div>
            <p>
              Bienvenidos al <strong>Proyecto Buffet</strong>, una iniciativa
              colaborativa desarrollada por los estudiantes de 6to 3ra.
              Nuestro objetivo es ofrecer un sistema eficiente, moderno y fácil
              de usar para mejorar la experiencia de pedir y disfrutar los
              alimentos de nuestro buffet.
            </p>
            
          </div>
        </section>
        <div className={`seccionProd ${darkMode ? "dark" : "light"}`}>
          <div className={`cajaProds ${darkMode ? "dark" : "light"}`}>
            <CartaSeccion
              nombre={"¡Desayuno/Merienda!"}
              img={img1}
              ruta="/productos/categoria/4"
            />
            <CartaSeccion
              nombre={"¡Golosinas!"}
              img={img4}
              ruta="/productos/categoria/5"
            />
            <CartaSeccion
              nombre={"¡Almuerzo/Cena!"}
              img={img2}
              ruta="/productos/categoria/6"
            />
            <CartaSeccion
              nombre={"¡Bebidas!"}
              img={img3}
              ruta="/productos/categoria/7"
            />
          </div>
        </div>
      </div>
      <div className={`seccionMenu ${darkMode ? "dark" : "light"}`}>
        <h4 className={`h4 ${darkMode ? "dark" : "light"}`}>
          <span className="colorido">Menu</span> del dia
        </h4>
        <div className={`cajaMenu ${darkMode ? "dark" : "light"}`}>
          <CartaMenu categoriaId={8} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Inicio;
