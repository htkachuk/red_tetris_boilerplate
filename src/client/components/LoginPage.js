import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

const LoginPage = props => (
  <div>
    <div className="txt-secondary">Sign Up</div>
    <Form.Group controlId="loginForm">
      <Form.Control className="input-std" type="email" placeholder="Login" />
      <Form.Control
        className="input-std"
        type="password"
        placeholder="Password"
      />
    </Form.Group>

    <Nav.Link
      className="txt-link mt-7"
      href="#"
      onClick={() => props.changePage("/register")}
    >
      Not registered yet?
    </Nav.Link>
    <Button
      variant="danger"
      className="btn-std"
      onClick={() => props.changePage("/lobby")}
    >
      Sign Up
    </Button>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: page => push(page)
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(LoginPage);
