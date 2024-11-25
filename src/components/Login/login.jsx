import Input from "./input";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Send from "./send";
import { DarkModeContext } from "../context/modeContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { login } = useContext(AuthContext); // Usa el login del contexto

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !contrasena) {
      setError("El email y la contraseña son requeridos.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        contrasena,
      });
  
      const userData = response.data;
  
      // Llama a la función login del contexto para guardar los datos del usuario
      login(userData); // Guarda el usuario en el contexto y localStorage
  
      setError("");
      console.log(userData); // Revisa los datos del usuario
  
      // Redirige según el rol
      if (userData.rol === 3) {
        navigate("/lista_usuarios"); // Redirige a la página de administración si es administrador
      } else {
        navigate("/"); // Redirige al home o al lugar correspondiente
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error en el servidor.");
      } else if (error.request) {
        setError("No se pudo conectar con el servidor.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
      console.error("Error al hacer login:", error);
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
            <Send id="btn-lg" type="submit" />
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
