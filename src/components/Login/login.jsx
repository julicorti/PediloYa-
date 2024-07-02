import Input from "./input";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import Send from "./send";
import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react"; 
const Login = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);


  return (
    <div>
      <div className={`paginaLogin ${darkMode ? "dark" : "light"}`}>
        <div className="cajaLogin">
            <h1>Login</h1>
            <div className="inputs">
          <Input name="Nombre"/>
          <Input name="Contraseña"/>
          <Link><p>Olvitaste la contraseña?</p></Link>
            </div>
            <Send/>
            <Link  to="/Register"><p>No tienes cuenta todavia? Registrate</p></Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
