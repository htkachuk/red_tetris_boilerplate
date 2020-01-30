import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const RegisterPage = props => (
  <div>
    <h1>RegisterPage</h1>
    <p>Welcome RegisterPage!</p>
    <button onClick={() => props.changePage()}>
      Go to about page via redux
    </button>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/register")
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(RegisterPage);
