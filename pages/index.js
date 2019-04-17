import React, { Component } from "react";
import Navigation from "../components/Navigation";
import Head from "../components/Head";

// services
import requestWorkoutList from "../services/requestWorkoutList";

// components
import Login from "../components/Login";
import SaveWorkoutForm from "../components/SaveWorkoutForm";
import List from "../components/List";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      workoutData: null,
    };
  }

  componentDidMount() {
    this.updateWorkoutData();
  }

  updateAuthenticationStatus = status => {
    this.setState(() => ({ authenticated: status }));
  };

  updateWorkoutData = async () => {
    const workoutData = await requestWorkoutList();

    if (workoutData.error) {
      this.updateAuthenticationStatus(false);
    } else {
      this.updateAuthenticationStatus(true);
      this.setState(() => ({ workoutData }));
    }
  };

  render() {
    const { authenticated, workoutData } = this.state;

    return (
      <div>
        <Head />
        <Navigation />
        {!authenticated && (
          <Login
            updateAuthenticationStatus={this.updateAuthenticationStatus}
            updateWorkoutData={this.updateWorkoutData}
          />
        )}
        {authenticated && (
          <SaveWorkoutForm updateWorkoutData={this.updateWorkoutData} />
        )}
        {workoutData && <List workoutData={workoutData} />}
      </div>
    );
  }
}

export default Index;
