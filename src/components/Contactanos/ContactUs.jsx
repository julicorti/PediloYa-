import { DarkModeContext } from "../context/modeContext";
import { useContext } from "react";
import "../../SASS/style.css";
import ContactForm from "./ContactForm";
const ContactUs = ({ nombre, desc, precio, img }) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <div>
      <div className="pageC">
        <div className="pre">
          <div className="box2">
            <h1>Contactanos</h1>
            <p>
              Estamos aquí para ayudarte. Si tienes alguna pregunta, comentario
              o simplemente necesitas más información, no dudes en ponerte en
              contacto con nosotros. Nuestro equipo está disponible para
              atenderte y asegurarse de que recibas la asistencia que necesitas.
              ¡Esperamos saber de ti pronto!
            </p>
            <br />
            <p>
                email@gmail.com
            </p>
            <br />
            <p>
                1124613507
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
