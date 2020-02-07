import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { register } from "../actions/register";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordRepeatedChange = this.handlePasswordRepeatedChange.bind(
      this
    );
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      email: "",
      password: "",
      passwordRepeated: ""
    };
  }

  validateForm() {
    return (
      this.state.passwordRepeated === this.state.password &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePasswordRepeatedChange(e) {
    this.setState({ passwordRepeated: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="txt-secondary">Sign In</div>
        <form
          onSubmit={() =>
            this.props.register(this.state.email, this.state.password)
          }
        >
          <Form.Group>
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
            <Form.Control
              className="input-std"
              type="password"
              placeholder="Repeat Password"
              value={this.state.passwordRepeated}
              onChange={this.handlePasswordRepeatedChange}
            />
          </Form.Group>

          <Nav.Link
            className="txt-link mt-0"
            href="#"
            onClick={() => this.props.changePage("/login")}
          >
            Have an account?
          </Nav.Link>
          <Button
            variant="danger"
            className="btn-std"
            disabled={!this.validateForm()}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: page => push(page),
      register: (email, password) => {
        dispatch(register(email, password));
        return push("/lobby");
      }
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(RegisterPage);
