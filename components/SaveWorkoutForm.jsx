import React, { Component } from "react";

class SaveWorkoutForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <input type="text" name="title" />
        <input type="text" name="body" />
      </form>
    );
  }
}

export default SaveWorkoutForm;
