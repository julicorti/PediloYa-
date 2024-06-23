import "../../SASS/style.css";
import { Link } from "react-router-dom";

const CartaSeccion = ({ nombre, img, ruta }) => {
    return (
        <div>
            <div className="cartaSeccion">
                <img src={img} alt={nombre} />
                <div className="contenido">
                    <h1>{nombre}</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis velit at nesciunt rem! Dolorem iste placeat architecto minus, eligendi, nesciunt dolore laboriosam ipsa corrupti dignissimos sed nam reiciendis porro saepe?
                    </p>
                    <Link to={ruta}>Pedir</Link>
                </div>
            </div>
        </div>
    )
}

export default CartaSeccion;
