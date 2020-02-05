import React from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import HomePage from "../components/HomePage";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import { Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      socket: null,
      endpoint: "http://0.0.0.0:3004"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({ socket });
    this.props.dispatch({ type: "SOCKET_CONNECTED", socket: socket });
  }

  render() {
    return (
      <div>
        <main>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    room: state.room
  };
};

export default connect(mapStateToProps)(App);
