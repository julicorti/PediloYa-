import React from 'react';
import "../../SASS/style.css";

const ContactForm = () => {
    return (
        <div className="contact-form">
          <h2 className="contact-form__title">Get in Touch</h2>
          <p className="contact-form__subtitle">You can reach us anytime</p>
          <form className="contact-form__form">
            <div className="contact-form__row">
              <input type="text" placeholder="First name" className="contact-form__input" />
              <input type="text" placeholder="Last name" className="contact-form__input" />
            </div>
            <div className="contact-form__input-group">
              <span className="contact-form__icon">
                <i className="fas fa-envelope"></i>
              </span>
              <input type="email" placeholder="Your email" className="contact-form__input" />
            </div>
            <div className="contact-form__phone-group">
              <select className="contact-form__select">
                <option value="+62">+62</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input type="text" placeholder="Phone number" className="contact-form__input contact-form__input--phone" />
            </div>
            <textarea placeholder="How can we help?" maxLength="120" className="contact-form__textarea" />
            <button type="submit" className="contact-form__button">Submit</button>
            <p className="contact-form__footer">
              By contacting us, you agree to our <a href="#" className="contact-form__link">Terms of service</a> and <a href="#" className="contact-form__link">Privacy Policy</a>
            </p>
          </form>
        </div>
      );
    };
export default ContactForm;
