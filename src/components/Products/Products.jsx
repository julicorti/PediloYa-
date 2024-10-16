import "../../SASS/style.css";
import { DarkModeContext } from "../context/modeContext";
import { useContext, useState, useEffect } from "react";
import Producto from "./producto.jsx";
import { useParams } from "react-router-dom"; 
import axios from "axios"; // No olvides importar axios

const Products = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { categoriaId } = useParams();
    const [categoriaNombre, setCategoriaNombre] = useState(""); // Estado para almacenar el nombre de la categoría

    useEffect(() => {
        const fetchCategoriaNombre = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/productos/categoria/${categoriaId}`);
                console.log("Respuesta de la API:", response.data); // Verificar los datos recibidos
                if (response.data.length > 0) {
                    setCategoriaNombre(response.data[0].categoria_nombre); // Guardar el nombre de la categoría
                }
            } catch (error) {
                console.error("Error al obtener el nombre de la categoría:", error);
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
                    Sección: {categoriaNombre ? categoriaNombre : "Cargando..."} 
                </h1> 
            </div>
            <Producto categoriaId={categoriaId} /> {/* Pasar la categoría como prop */}
       
        </div>
    );
}

export default Products;
