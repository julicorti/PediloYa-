import React from 'react';

const InputRegister = ({ type = "text", label, required = false }) => {
  return (
    <div className="form__group">
      <input required={required} type={type} className="form__field" placeholder={label} />
      <label className="form__label">{label}</label>
    </div>
  );
};

export default InputRegister;
