import React from "react";
import NavBar from "./NavBar";
import "../../SASS/style.css";
import Carousel from "./Carousel";
import CartaSeccion from '../InicioProductos/cartaSeccion'
import img1 from "../../img/comida/medialuna.jpg";
import img2 from "../../img/comida/pizza.png";
import img3 from "../../img/comida/cocacola.webp";
import img4 from "../../img/comida/rapsodia.png";
import Footer from "./Footer";
import { useState, useEffect  } from "react";
const Inicio = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Verifica el estado guardado en localStorage para el modo oscuro
    if (localStorage.getItem('dark-mode') === 'enabled') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Función para cambiar entre modos claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
    }
  };

  return (
    <div className={`main-content ${darkMode ? 'dark' : 'light'}`}>
      <div className="pagina">
        <Carousel />
      </div>
      <div className="seccion2">
        <div className="titulo-seccion">
          <hr className="linea"/>
          <h3 className="titulo">Categorías</h3>
          <hr className="linea"/>
        </div>
        <div className="seccionProd">
          <div className={`cajaProds ${darkMode ? 'dark' : 'light'}`}>
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
