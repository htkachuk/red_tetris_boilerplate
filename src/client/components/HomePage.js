import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

const HomePage = props => (
  <div>
    <div className="txt-header">Red Tetris</div>
    <div className="txt-description">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa.
    </div>
    <div className="txt-middle py-4">Ready?</div>
    <Button
      variant="danger"
      className="btn-std"
      onClick={() => props.changePage()}
    >
      Let's Go!
    </Button>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/login")
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(HomePage);
