import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      workoutList: null,
    };
  }

  componentDidMount() {
    this.requestWorkoutList();
  }

  requestWorkoutList = async () => {
    const { updateAuthentication } = this.props;
    try {
      const readableStream = await fetch("/api/get-workout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });
      const workoutList = await readableStream.json();
      this.setState({
        authenticated: true,
        workoutList,
      });
      updateAuthentication(true);
    } catch (e) {
      this.setState({
        authenticated: false,
      });
      updateAuthentication(false);
    }
  };

  render() {
    const { authenticated, workoutList } = this.state;
    return (
      <ul>
        {authenticated &&
          workoutList.map((workout, index) => {
            return (
              <li key={`${workout}${index}`}>
                <h1>{new Date(workout.date).toLocaleDateString("en-GB")}</h1>
                <h2>{workout.title}</h2>
                <p>{workout.body}</p>
              </li>
            );
          })}
      </ul>
    );
  }
}

export default List;
