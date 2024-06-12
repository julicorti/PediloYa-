import React from "react";
import NavBar from "./NavBar";
import "../../SASS/style.css";
import Carousel from "./Carousel";
import CarouselProd from "../InicioProductos/Carousel";

const Inicio = () => {
  return (
    <div>
      <NavBar />
      <div className="pagina">
        <Carousel></Carousel>
      </div>
      <div className="seccion2">
        <h1>Menu del dia</h1>
       
         <CarouselProd/>
        
          <div className="cajaProds">

          </div>
      </div>
    </div>
  );
};

export default Inicio;
