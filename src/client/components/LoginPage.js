import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { login } from "../actions/login";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="txt-secondary">Sign Up</div>
        <Form.Group controlId="loginForm">
          <Form.Control
            className="input-std"
            type="email"
            placeholder="Login"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <Form.Control
            className="input-std"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </Form.Group>

        <Nav.Link
          className="txt-link mt-7"
          href="#"
          onClick={() => this.props.changePage("/register")}
        >
          Not registered yet?
        </Nav.Link>
        <Button
          variant="danger"
          className="btn-std"
          onClick={() =>
            this.props.login(this.state.email, this.state.password)
          }
        >
          Sign Up
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: page => push(page),
      login: (email, password) => {
        dispatch(login(email, password));
        return push("/lobby");
      }
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(LoginPage);
