import "../../SASS/style.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react";
const Producto = ({ nombre, precio, desc, img }) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="producto">
      <div className="relative flex w-48 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-2 -mt-4 h-24 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-3">
          <h5 className="mb-1 block font-sans text-sm font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {nombre}
          </h5>
          <p className="block font-sans text-xs font-light leading-relaxed text-inherit antialiased">
            {desc}
          </p>
        </div>
        <div className="p-3 pt-0">
          <Link to="/carrito">
            <a
              data-ripple-light="true"
              type="button"
              className="select-none rounded-lg bg-blue-500 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              href="#"
            >
              Agregar
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Producto;
