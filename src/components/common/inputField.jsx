const InputField = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        type={props.type}
        className="form-control"
      />
    </div>
  );
};

export default InputField;
