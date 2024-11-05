import "../../SASS/style.css";
import { DarkModeContext } from "../context/modeContext";
import { CartContext } from "../context/CartContext.jsx"; // Importa el CartContext
import { useContext, useState, useEffect } from "react";
import Producto from "./producto.jsx"; // Asegúrate de que la ruta sea correcta
import { useParams } from "react-router-dom"; 
import axios from "axios"; // No olvides importar axios

const Products = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { categoriaId } = useParams();
    const [categoriaNombre, setCategoriaNombre] = useState(""); // Estado para almacenar el nombre de la categoría
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        const fetchCategoriaNombre = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/productos/categoria/${categoriaId}`);
                console.log("Respuesta de la API:", response.data);
                if (response.data.length > 0) {
                    setCategoriaNombre(response.data[0].categoria_nombre);
                }
            } catch (error) {
                console.error("Error al obtener el nombre de la categoría:", error);
            } finally {
                setLoading(false); // Cambiar el estado de carga a false
            }
        };
    
        fetchCategoriaNombre();
    }, [categoriaId]);

    return (
        <div className={`pag ${darkMode ? "dark" : "light"}`}>
            <div id="btn-prod">
                <h2>Productos</h2>
            </div>
            <div className="tex">
                <h1 className={`h1 ${darkMode ? "dark" : "light"}`}>
                    Sección: {loading ? "Cargando..." : categoriaNombre}
                </h1>
            </div>
            <Producto categoriaId={categoriaId} /> {/* Pasamos la categoriaId al componente Producto */}
        </div>
    );
}

export default Products;
