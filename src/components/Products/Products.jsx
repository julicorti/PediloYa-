import "../../SASS/style.css";
import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react";
import { useInView } from 'react-intersection-observer';
import Producto from "./producto.jsx";
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
          
                
                <Producto />
               
        </div>
    );
}

export default Products;
