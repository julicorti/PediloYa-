
import "../../SASS/style.css";

import ContactForm from "./ContactForm";
const ContactUs = ({ nombre, desc, precio, img }) => {
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
            <p>email@gmail.com</p>
            <br />
            <p>1124613507</p>
            <div className="seccionesCajas">
              <div className="caja">
                <h4>Atención al Cliente</h4>
                <p>
                  Nuestro equipo está disponible para atender cualquier consulta
                  o duda que puedas tener sobre el buffet.
                </p>
              </div>
              <div className="caja">
                <h4>Sugerencias y Comentarios</h4>
                <p>
                  Valoramos tus opiniones y estamos constantemente mejorando el
                  buffet. Tu feedback es crucial para ofrecer un mejor servicio.
                </p>
              </div>
              <div className="caja">
                <h4>Consultas Generales</h4>
                <p>
                  Para cualquier consulta general o información adicional, por
                  favor contáctanos en: buffet@escuela36.edu.ar
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
      <div className="pre2">
        <iframe
          id="mapa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.7208997259436!2d-58.496517024416704!3d-34.56062137296977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6f1ce409681%3A0xed70920e983fcb6a!2sEscuela%20T%C3%A9cnica%2036%20D.E.%2015%20-%20Alte.%20Brown!5e0!3m2!1ses!2sar!4v1724206646230!5m2!1ses!2sar"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />{" "}
        <div className="contenido">
          <h2>Nuestra Ubicación</h2>
          <h3>Sabores que nos Unen</h3>
          <h4>Buffet Escolar</h4>
          <p>Escuela Técnica 36 D.E. 15 - Alte. Brown</p>
          <p>Galván 3700, C1431FVK</p>
          <p>Ciudad Autónoma de Buenos Aires</p>
          <p>Argentina</p>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
