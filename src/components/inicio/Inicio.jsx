import React from "react";
import NavBar from "./NavBar";
import "../../SASS/style.css";
import Carousel from "./Carousel";
import CartaSeccion from '../InicioProductos/cartaSeccion'
import img1 from "../../img/comida/medialuna.webp";
import img2 from "../../img/comida/pizza.webp";
import img3 from "../../img/comida/cocacola.webp";
import img4 from "../../img/comida/rapsodia.png";
import Footer from "./Footer";
const Inicio = () => {
  return (
    <div>

      <div className="pagina">
        <Carousel />
      </div>
      <div className="seccion2">
        <div className="seccionProd">
          <div className="cajaProds">
            <CartaSeccion
              nombre={"¡Desayuno/Merienda!"}
              img={img1}
              ruta="/desayuno"
            />
              <CartaSeccion nombre={"¡Golosinas!"} img={img4} ruta="/golosinas" />
          </div>
          <div className="cajaProds">
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
