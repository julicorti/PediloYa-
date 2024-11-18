import React, { useState, useContext, useEffect } from "react";
import InputRegister from "./_inputRegister";
import Send from "../send";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { DarkModeContext } from "../../context/modeContext";

const Register = ({ setIsAuthenticated }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Instancia de useNavigate

  // Cargar estado inicial de autenticación desde localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(isLoggedIn);
  }, [setIsAuthenticated]);

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      nombre,
      contrasena,
      email,
    };

    try {
      const response = await fetch("http://localhost:4000/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Registro exitoso");
        setIsAuthenticated(true); // Actualiza el estado de autenticación
        localStorage.setItem("isAuthenticated", "true"); // Persistencia
        navigate("/"); // Redirige a la página principal
      } else {
        const error = await response.json();
        alert(error.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className={`pagRegister ${darkMode ? "dark" : "light"}`}>
      <div className="cajaRegister">
        <h1>¡Regístrate!</h1>
        <form className="contenido" onSubmit={handleRegister}>
          <InputRegister
            type="text"
            label="Name"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <InputRegister
            type="password"
            label="Password"
            required
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            autoComplete="current-password"
          />
          <InputRegister
            type="email"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Link to="/login">
            <p>¿Ya tienes una cuenta? Inicia sesión</p>
          </Link>
          <Send to="/login" />
        </form>
      </div>
    </div>
  );
};

export default Register;
