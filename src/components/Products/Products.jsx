import "../../SASS/style.css";
import img1 from '../../img/comida/PASTAFROLA.jpg';
import CartaPrueba from './cartaPrueba';
const Products = () => {
    return (
        <div className="pag">

            <h1>Productos</h1>


            <div className="cajaProductos">

                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />
                <CartaPrueba nombre='Pastafrola' img={img1} stock="50" precio="50" desc="Pastafrola de membrillo" />



            </div>
        </div>
    )
}
export default Products;