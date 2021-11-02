import React from "react";
import Joi from "joi-browser";

import InputField from "./common/inputField";

class LoginForm extends React.Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
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
    // first create a obj with key value as name: value
    // validate the element using joi and add the err to the obj
    // return the errors obj]
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
    // call the server
    console.log("submitted");
  };

  handleChange = e => {
    const { name, value } = e.target;
    const input = e.target;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // changing the state
    const account = { ...this.state.account };
    account[name] = value;

    this.setState({
      account,
      errors,
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <InputField
            label="Username"
            name="username"
            type="text"
            className="form-control"
            value={this.state.account.username}
            onChange={this.handleChange}
            error={this.state.errors.username}
          />
          <InputField
            label="password"
            name="password"
            type="text"
            className="form-control"
            value={this.state.account.password}
            onChange={this.handleChange}
            error={this.state.errors.password}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
