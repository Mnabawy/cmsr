import React from "react";
import InputField from "./common/inputField";

class LoginForm extends React.Component {
  state = {
    account: {
      username: "",
      password: "",
    },
  };

  handleSubmit = e => {
    e.preventDefault();

    // call the server
    console.log("submitted");
  };

  handleChange = e => {
    const account = this.state.account;
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
          />
          <InputField
            label="password"
            name="password"
            type="text"
            className="form-control"
            value={this.state.account.password}
            onChange={this.handleChange}
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
