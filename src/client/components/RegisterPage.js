import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

const RegisterPage = props => (
  <div>
    <div className="txt-secondary">Sign In</div>
    <Form.Group controlId="loginForm">
      <Form.Control className="input-std" type="email" placeholder="Login" />
      <Form.Control
        className="input-std"
        type="password"
        placeholder="Password"
      />
      <Form.Control
        className="input-std"
        type="password"
        placeholder="Repeat Password"
      />
    </Form.Group>

    <Nav.Link
      className="txt-link mt-0"
      href="#"
      onClick={() => props.changePage("/login")}
    >
      Have an account?
    </Nav.Link>
    <Button
      variant="danger"
      className="btn-std"
      onClick={() => props.changePage("/lobby")}
    >
      Sign In
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

export default connect(null, mapDispatchToProps)(RegisterPage);
