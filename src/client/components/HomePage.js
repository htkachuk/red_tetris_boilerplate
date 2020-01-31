import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

const HomePage = props => (
  <div>
    <div className="header-text">Red Tetris</div>
    <div className="description-text">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa.
    </div>
    <div className="middle-text py-4">Ready?</div>
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
      changePage: () => push("/home")
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(HomePage);
