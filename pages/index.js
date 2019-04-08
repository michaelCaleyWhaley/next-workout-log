import React, { Component } from "react";
import Navigation from "../components/Navigation";
import Head from "../components/Head";

import Login from "../components/Login";
import SaveWorkoutForm from "../components/SaveWorkoutForm";
import List from "../components/List";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
    };
  }

  updateAuthentication = status => {
    this.setState(
      () => {
        return { authenticated: status };
      },
      () => {
        console.log(`this.state: `, this.state);
      },
    );
  };

  componentDidMount() {}

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <Head />
        <Navigation />
        <SaveWorkoutForm />
        {!authenticated && <Login />}
        <List updateAuthentication={this.updateAuthentication} />
      </div>
    );
  }
}

export default Index;
