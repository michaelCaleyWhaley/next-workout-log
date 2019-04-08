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

  handleFormSubmit = e => {
    e.preventDefault();

    console.log(`e.target: `, e.target);
  };

  render() {
    return (
      <form>
        <input type="text" name="title" onChange={this.handleChange} />
        <input type="text" name="body" onChange={this.handleChange} />
        <input type="submit" value="submit" onClick={this.handleFormSubmit} />
      </form>
    );
  }
}

export default SaveWorkoutForm;
