import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { workoutData } = this.props;
    console.log(`workoutData: `, workoutData);

    return (
      <ul>
        {workoutData.map((workout, index) => {
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
