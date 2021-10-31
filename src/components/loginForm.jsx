import React from "react";
import InputField from "./common/inputField";

class LoginForm extends React.Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required.";
    if (account.password.trim() === "")
      errors.password = "Password is required.";

    // to check if the errors object has keys
    return Object.keys(errors).length === 0 ? null : errors;
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


    const account = {...this.state.account};
    account[e.target.name] = e.target.value;

    this.setState({
      account,
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
