const Input = ({ name, value, onChange, type, required }) => {
  return (
    <div className="form-control">
      <input
        type={type} // 'email' o 'password', dependiendo del campo
        value={value} // Conectamos el estado al input
        onChange={onChange} // Actualizamos el estado cuando el valor cambia
        required={required}
      />
      <label>
        {name.split('').map((char, index) => (
          <span id="lg" key={index} style={{ transitionDelay: `${index * 50}ms` }}>
            {char}
          </span>
        ))}
      </label>
    </div>
  );
};

export default Input;
