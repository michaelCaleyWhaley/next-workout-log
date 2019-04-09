import React, { Component } from "react";

// services
import submitWorkoutData from "../services/submitWorkoutData";

class SaveWorkoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const newWorkout = await submitWorkoutData(this.state);
    if (newWorkout._id) {
      this.props.updateWorkoutData();
      this.clearForm();
    }
  };

  clearForm = e => {
    this.setState(() => ({
      title: "",
      body: "",
    }));
    document.getElementById("save-work-form").reset();
  };

  render() {
    return (
      <form id="save-work-form" autoComplete="off">
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="body"
          onChange={this.handleChange}
          autoComplete="off"
        />
        <input type="submit" value="submit" onClick={this.handleFormSubmit} />
      </form>
    );
  }
}

export default SaveWorkoutForm;
