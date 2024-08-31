import React from 'react';
import "../../SASS/style.css";

const ContactForm = () => {
    return (
        <div className="contact-form">
          <h2 className="contact-form__title">Get in Touch</h2>
          <p className="contact-form__subtitle">You can reach us anytime</p>
          <form className="contact-form__form">
            <div className="contact-form__row">
              <input type="text" placeholder="Nombre" className="contact-form__input" />
              <input type="text" placeholder="Apellido" className="contact-form__input" />
            </div>
            <div className="contact-form__input-group">
              <span className="contact-form__icon">
                <i className="fas fa-envelope"></i>
              </span>
              <input type="email" placeholder="Email" className="contact-form__input" />
            </div>
            <div className="contact-form__phone-group">
              <select className="contact-form__select">
                <option value="+54">+54</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input type="text" placeholder="Numero de celular" className="contact-form__input contact-form__input--phone" />
            </div>
            <textarea placeholder="Como podriamos ayudarte?" maxLength="120" className="contact-form__textarea" />
            <button type="submit" className="contact-form__button">Enviar</button>
            <p className="contact-form__footer">
            </p>
          </form>
        </div>
      );
    };
export default ContactForm;
