import InputRegister from "./_inputRegister";
import Send from "../send";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/modeContext";
import { useContext } from "react"; 
const Register = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`pagRegister ${darkMode ? "dark" : "light"}`}>
      <div className="cajaRegister">
        <h1>Registrate!</h1>
        <div className="contenido">
           <InputRegister type="text" label="Name" required />
          <InputRegister type="password" label="Password" required /> 
          <Link to="/login"><p>Ya tiene una cuenta? Logueate</p></Link>  
        </div>
    <Send/>
      </div>
    </div>
  );
};
export default Register;
