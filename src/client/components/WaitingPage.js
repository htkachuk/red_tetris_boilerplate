import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { lockRoom } from "../actions/lockRoom";

class WaitingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="txt-secondary">Waiting... </div>
        <form
          onSubmit={() => {
            event.preventDefault();
            this.props.lockRoom(this.props.token);
          }}
        >
          <Container className="players-list mb-5">
            {this.props.room.participants ? (
              this.props.room.participants.map((player, index) => (
                <Row>
                  <Col key={index}>{player.login}</Col>
                </Row>
              ))
            ) : (
              <div></div>
            )}
          </Container>

          <Button variant="danger" className="btn-std" type="submit">
            Lock Room
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
      lockRoom: token => {
        dispatch(lockRoom(token));
      }
    },
    dispatch
  );

const mapStateToProps = state => ({
  room: state.room,
  token: state.token
});
export default connect(mapStateToProps, mapDispatchToProps)(WaitingPage);
