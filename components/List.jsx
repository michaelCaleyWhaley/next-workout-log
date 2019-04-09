import React, { Component } from "react";
import "../scss/list.scss";

class List extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { workoutData } = this.props;

    return (
      <ul id="workout-list">
        {workoutData
          .map((workout, index) => {
            return (
              <li className="workout-list__item" key={`${workout}${index}`}>
                <h1>{new Date(workout.date).toLocaleDateString("en-GB")}</h1>
                <h2>{workout.title}</h2>
                <p>{workout.body}</p>
              </li>
            );
          })
          .reverse()}
      </ul>
    );
  }
}

export default List;
