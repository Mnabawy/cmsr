import React from "react";
import Joi from "joi-browser";

import InputField from "./common/inputField";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // call the server
    console.log("submitted");
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
            value={this.state.data.username}
            onChange={this.handleChange}
            error={this.state.errors.username}
          />
          <InputField
            label="password"
            name="password"
            type="password"
            className="form-control"
            value={this.state.data.password}
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
