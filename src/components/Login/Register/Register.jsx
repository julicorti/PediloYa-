import React, { useState, useContext, useEffect } from "react";
import InputRegister from "./_inputRegister";
import Send from "../send";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/modeContext";
import { AuthContext } from "../../context/AuthContext"; // Importa el AuthContext

const Register = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { login } = useContext(AuthContext); // Accede al login del contexto
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Instancia de useNavigate

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

        // Llamamos a la función login del contexto para actualizar el estado de autenticación
        login(result); // Suponiendo que el resultado contiene los datos del usuario

        // Guardamos el estado de autenticación en el localStorage
        localStorage.setItem("isAuthenticated", "true");

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
          <div className="contenido-btn">
          <Send to="/login" />
          <Link to="/login">
            <p>¿Ya tienes una cuenta? Inicia sesión</p>
          </Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
