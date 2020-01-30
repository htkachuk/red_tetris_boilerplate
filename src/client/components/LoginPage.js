import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const LoginPage = props => (
  <div>
    <h1>LoginPage</h1>
    <p>Welcome LoginPage!</p>
    <button onClick={() => props.changePage()}>
      Go to about page via redux
    </button>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/login")
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(LoginPage);
