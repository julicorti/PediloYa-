import "../../SASS/style.css";
import img1 from '../../img/comida/PASTAFROLA.jpg';
import Producto from "./producto";
import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react";
import { useInView } from 'react-intersection-observer';

const Products = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { ref, inView } = useInView({
        triggerOnce: true, // Solo dispara la animación una vez
        threshold: 0.1 // 10% del elemento debe ser visible
    });

    return (
        <div className={`pag ${darkMode ? "dark" : "light"}`}>
            <div id="btn-prod">
                <h2>Productos</h2>
            </div>
            <div className="tex">
                <h1 className={`h1 ${darkMode ? "dark" : "light"}`}>Sección Desayuno</h1> 
            </div>
            <div 
                ref={ref}
                className={`cajaProductos ${darkMode ? "dark" : "light"} ${inView ? "visible" : "hidden"}`}
            >
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
            </div>
        </div>
    );
}

export default Products;
