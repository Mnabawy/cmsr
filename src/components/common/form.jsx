import React from "react";
import Joi  from "joi-browser";

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!result.error) return null;

    const errors = {};
    const errorsArray = result.error.details;
    for (let item of errorsArray) {
      errors[item.path] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    const input = e.target;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // changing the state
    const data = { ...this.state.data };
    data[name] = value;

    this.setState({
      data,
      errors,
    });
  };
}

export default Form;
