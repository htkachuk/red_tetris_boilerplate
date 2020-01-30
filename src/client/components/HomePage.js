import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const HomePage = props => (
  <div>
    <h1>HomePage</h1>
    <p>Welcome HomePage!</p>
    <button onClick={() => props.changePage()}>
      Go to about page via redux
    </button>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/home")
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(HomePage);
