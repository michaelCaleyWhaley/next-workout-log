import React, { Component } from "react";
import Navigation from "../components/Navigation";
import Head from "../components/Head";

import Login from "../components/Login";
import List from "../components/List";

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head />
        <Navigation />
        <p>Hello Next.js</p>

        <Login />
        <List userID={"5c99580db96ec70a86e21c1e"} />
      </div>
    );
  }
}

export default Index;
