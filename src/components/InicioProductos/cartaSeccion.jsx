import "../../SASS/style.css";
import { Link } from "react-router-dom";

const CartaSeccion = ({ nombre, img, ruta }) => {
    return (
        <div>
            <div className="cartaSeccion">
                <img className="imgColor" src={img}  />
                <div className="contenido">
                    <h1>{nombre}</h1>
                   
                    <Link to={ruta}>Ir</Link>
                </div>
            </div>
        </div>
    )
}

export default CartaSeccion;
