import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.requestWorkoutList();
  }

  requestWorkoutList = async () => {
    try {
      const workoutList = await fetch("/api/get-workout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });
      console.log(`workoutList: `, workoutList);
    } catch (e) {
      console.log(`error: `, e);
    }
  };

  render() {
    return (
      <ul>
        <li>workout list</li>
      </ul>
    );
  }
}

export default List;
