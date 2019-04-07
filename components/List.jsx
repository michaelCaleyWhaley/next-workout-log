import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    this.requestWorkoutList();
  }

  requestWorkoutList = async () => {
    try {
      const readableStream = await fetch("/api/get-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });

      const workoutList = await readableStream.json();

      console.log(`workoutList: `, workoutList);

      this.setState({
        authenticated: true,
      });
    } catch (e) {}
  };

  render() {
    const { authenticated } = this.state;
    return <ul>{authenticated && <li>workout list</li>}</ul>;
  }
}

export default List;
