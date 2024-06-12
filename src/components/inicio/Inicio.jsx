import React from "react";
import NavBar from "./NavBar";
import "../../SASS/style.css";
import Carousel from "./Carousel";
import img from "../../img/comida/burga.png";
import Carta from "../InicioProductos/carta";
const Inicio = () => {
  return (
    <div>
      <NavBar />
      <div className="pagina">
        <Carousel></Carousel>
      </div>
      <div className="seccion2">
        <h1>Menu del dia</h1>
        <div className="carouselProds">
          <Carta
            nombre="BigMac"
            img={img}
            desc="Hamburguesa con lechuga, queso, 2 carnes, salsa y pepinos"
            precio={799.99}
          />
            <Carta
            nombre="BigMac"
            img={img}
            desc="Hamburguesa con lechuga, queso, 2 carnes, salsa y pepinos"
            precio={799.99}
          />
            <Carta
            nombre="BigMac"
            img={img}
            desc="Hamburguesa con lechuga, queso, 2 carnes, salsa y pepinos"
            precio={799.99}
          />
            <Carta
            nombre="BigMac"
            img={img}
            desc="Hamburguesa con lechuga, queso, 2 carnes, salsa y pepinos"
            precio={799.99}
          />
            <Carta
            nombre="BigMac"
            img={img}
            desc="Hamburguesa con lechuga, queso, 2 carnes, salsa y pepinos"
            precio={799.99}
          />
        </div>
          <div className="cajaProds">

          </div>
      </div>
    </div>
  );
};

export default Inicio;
