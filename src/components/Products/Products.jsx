import "../../SASS/style.css";
import CartaProducts from "./CartaProducts";
import img1 from '../../img/comida/PASTAFROLA.jpg';
const Products = () => {
    return (
        <div className="pag">
            <div className="cajaProductos">
            <CartaProducts nombre="Pastafrola" price="$20.5" img={img1} desc="Pastafrola de membrillo"/>
            <CartaProducts nombre="Pastafrola" price="$20.5" img={img1} desc="Pastafrola de membrillo"/>

            <CartaProducts nombre="Pastafrola" price="$20.5" img={img1} desc="Pastafrola de membrillo"/>

            <CartaProducts nombre="Pastafrola" price="$20.5" img={img1} desc="Pastafrola de membrillo" stock='50'/>



            </div>
        </div>
    )
}
export default Products;