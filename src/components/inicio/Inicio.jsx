import React from "react";
import NavBar from "./NavBar";
import "../../SASS/style.css";
import Carousel from "./Carousel";
import CarouselProd from "../InicioProductos/CarouselProd";
import CartaSeccion from "../InicioProductos/cartaSeccion";
import img from '../../img/menu6.jpg';
const Inicio = () => {
  return (
    <div>
      <NavBar />
      <div className="pagina">
        <Carousel />
      </div>
      <div className="seccion2">
        <h1>Menu del dia</h1>
        <CarouselProd />

        <div className="seccionProd"> 
          <div className="cajaProds">
          <CartaSeccion nombre={"Desayuno/Merienda"} img={img} />
          <CartaSeccion nombre={"Almuerzo/Cena"} img={img} />
          <CartaSeccion nombre={"Bebidas"} img={img} />
          <CartaSeccion nombre={"Golosinas"} img={img} />
          

          </div>
        </div>

      </div>
    </div>
  );
};

export default Inicio;
