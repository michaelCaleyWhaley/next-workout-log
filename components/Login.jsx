import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "kneedeepwater@hotmail.com",
      password: "testcaley",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.type]: event.target.value,
    });
  };

  submitLogin = async e => {
    e.preventDefault();
    const { updateAuthenticationStatus, updateWorkoutData } = this.props;
    try {
      const login = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });
      updateAuthenticationStatus(true);
      updateWorkoutData();
    } catch (e) {
      updateAuthenticationStatus(false);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <input
          type="email"
          email={email}
          onChange={this.handleChange}
          list="defaultEmails"
        />
        <datalist id="defaultEmails" />
        <input
          type="password"
          password={password}
          onChange={this.handleChange}
        />
        <input type="submit" onClick={this.submitLogin} />
      </form>
    );
  }
}

export default Login;
