import "../../SASS/style.css";
import img1 from '../../img/comida/PASTAFROLA.jpg';
import Producto from "./producto";
import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react";
const Products = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    return (
        <div className={`pag ${darkMode ? "dark" : "light"}`}>
        <div className="tex">
            <h1>Productos</h1> 

        </div>

  


            <div  className={`cajaProductos ${darkMode ? "dark" : "light"}`}>

     
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>
                <Producto img={img1} nombre="Pastafrola" desc="Pastafrola de membrillo" precio="$90.05"/>

            </div>
        </div>
    )
}
export default Products;