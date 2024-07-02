
const Input = ({name}) => {
  return (
    <div className="form-control">
    <input type="value" required />
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
