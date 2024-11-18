import Input from "./input";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Send from "./send";
import { DarkModeContext } from "../context/modeContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const Login = ({ setIsAuthenticated }) => {
  const { darkMode } = useContext(DarkModeContext);

  // Estados para manejar los campos del formulario
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Usar para redirigir después del login exitoso

  const {login} = useContext(AuthContext)

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto de submit
    
    // Verificar que los valores de email y contrasena no están vacíos
    if (!email || !contrasena) {
      setError("El email y la contraseña son requeridos.");
      return; // Detener la ejecución si faltan campos
    }

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        contrasena,
      });
      login(response.data)

      setError(""); // Limpiar error si existía
      
      navigate('/'); // Redirigir al usuario al dashboard o página de inicio
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error en el servidor.');
      } else if (error.request) {
        setError('No se pudo conectar con el servidor.');
      } else {
        setError('Ocurrió un error inesperado.');
      }
      console.error('Error al hacer login:', error);
    }
  };

  return (
    <div>
      <div className={`paginaLogin ${darkMode ? "dark" : "light"}`}>
        <div className="cajaLogin">
          <h1>Login</h1>
          <form onSubmit={handleLogin} className="inputs">
            <Input
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <Input
              name="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              type="password"
              required
            />
            {error && <p className="error-message">{error}</p>}
            <Send type="submit" />
          </form>
          <Link to="/register">
            <p>No tienes cuenta todavía? Regístrate</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
