import React from "react";
import { wsConnect } from "../middleware/socketMiddleware";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import HomePage from "../components/HomePage";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import { Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      response: props.message,
      endpoint: "http://0.0.0.0:3004"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
  }

  render() {
    // const { response } = this.state;
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </header>

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
    message: state.message
  };
};
export default connect(mapStateToProps, null)(App);
