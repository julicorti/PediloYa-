import "../../SASS/style.css";

const cartaProducts = ({ nombre, img, desc, price, stock }) => {
    return (
        <div>
            <div className="carta">
                
                <img src={img} alt="" />
                <h1>{nombre}</h1>
                <div className="contenido">
                    <div className="contenido2">
                        <h2>Precio: {price}</h2>
                        <p>{desc}</p>

                    {/* <h2>Stock: {stock}</h2> */}
                    </div>
                    <a href="">Agregar al carrito</a>
                </div>
            </div>
        </div>
    )
}

export default cartaProducts;