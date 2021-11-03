import React from "react";
import Joi from "joi-browser";

import InputField from "./common/inputField";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    // call the server
    console.log("submitted");
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div className="contianer">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <InputField
            label="Username"
            value={data.username}
            onChange={this.handleChange}
            name="username"
            type="text"
            className="form-control"
            error={errors.username}
          />
          <InputField
            label="Password"
            value={data.password}
            onChange={this.handleChange}
            name="password"
            type="password"
            className="form-control"
            error={errors.password}
          /> 
          <InputField
            label="Name"
            value={data.name}
            onChange={this.handleChange}
            name="name"
            type="text"
            className="form-control"
            error={errors.name}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
