import React, { useEffect } from "react";
import smoothScrollbar from "smooth-scrollbar";
import Carta from '../InicioProductos/carta';
import "../../SASS/style.css";
import img from '../../img/menu6.jpg';

const CarouselProd = () => {
  useEffect(() => {
    const gap = 16;
    let width = 0;
    const carousel = document.getElementById("carousel");
    const content = document.getElementById("content");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");

    const handleNextClick = (e) => {
      carousel.scrollBy({
        left: width + gap,
        behavior: "smooth" 
      });
      if (carousel.scrollWidth !== 0) {
        prev.style.display = "flex";
      }
      if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = "none";
      }
    };

    const handlePrevClick = (e) => {
      carousel.scrollBy({
        left: -(width + gap),
        behavior: "smooth" 
      });
      if (carousel.scrollLeft - width - gap <= 0) {
        prev.style.display = "none";
      }
      if (content.scrollWidth - width - gap > carousel.scrollLeft + width) {
        next.style.display = "flex";
      }
    };

    const handleResize = (e) => {
      width = carousel.offsetWidth;
    };

    next.addEventListener("click", handleNextClick);
    prev.addEventListener("click", handlePrevClick);
    window.addEventListener("resize", handleResize);

    return () => {
      next.removeEventListener("click", handleNextClick);
      prev.removeEventListener("click", handlePrevClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  return (
    <div className="carouselCaja" >
      <div id="wrapper">
        <div id="carousel">
          <div id="content" className="content">
            <Carta nombre={"Big Bacon"} img={img} precio={"600"} desc={"Doble hamburguesa con queso cheddar y bacon"} />
            <Carta nombre={"Big Bacon"} img={img} precio={"600"} desc={"Doble hamburguesa con queso cheddar y bacon"} />
            <Carta nombre={"Big Bacon"} img={img} precio={"600"} desc={"Doble hamburguesa con queso cheddar y bacon"} />
            <Carta nombre={"Big Bacon"} img={img} precio={"600"} desc={"Doble hamburguesa con queso cheddar y bacon"} />
            <Carta nombre={"Big Bacon"} img={img} precio={"600"} desc={"Doble hamburguesa con queso cheddar y bacon"} />
            <Carta nombre={"Big Bacon"} img={img} precio={"600"} desc={"Doble hamburguesa con queso cheddar y bacon"} />
            <Carta nombre={"Big Bacon"} img={img} precio={"600"} desc={"Doble hamburguesa con queso cheddar y bacon"} />
          </div>
        </div>
        <button id="prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
          </svg>
        </button>
        <button id="next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarouselProd;
