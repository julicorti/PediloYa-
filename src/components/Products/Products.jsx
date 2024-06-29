import "../../SASS/style.css";
import img1 from '../../img/comida/PASTAFROLA.jpg';
import Producto from "./producto";
const Products = () => {
    return (
        <div className="pag">
        <div className="tex">
            <h1>Productos</h1> 

        </div>

  


            <div className="cajaProductos">

     
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