import "../../SASS/style.css";


const cartaSeccion = ({ nombre, img }) => {
    return (
        <div >


            <div className="cartaSeccion">
                 
                <img src={img} alt="" />
                <h1>{nombre}</h1>


            </div>
        </div>
    )
}
export default cartaSeccion;