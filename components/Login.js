import React, { Fragment, Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  submitLogin = () => {
    console.log("mike");
  };

  render() {
    return (
      <form>
        <input type="text" onClick={this.submitLogin} />
        <input type="email" />
        <input type="submit" />
      </form>
    );
  }
}

export default Login;
