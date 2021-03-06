import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { lockRoom } from "../actions/lockRoom";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let elements = Array.from(Array(10 * 20).keys());
    let elementsGrid = elements.reduce(
      (rows, key, index) =>
        (index % 10 == 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      []
    );
    let contenders = Array.from(Array(6).keys());
    let contendersGrid = contenders.reduce(
      (rows, key, index) =>
        (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
        rows,
      []
    );
    return (
      <div className="h-100 w-100">
        <form
          className="h-100 w-100"
          onSubmit={() => {
            event.preventDefault();
            this.props.lockRoom(this.props.token);
          }}
        >
          <Button variant="danger" className=" btn-corner" type="submit">
            Give Up
          </Button>
          <Container className="h-100 w-100 mt-5">
            <Row>
              <Col className="game-frame mx-5" id="game-field" sm={5}>
                {elementsGrid.map((elements, index) => (
                  <Row key={index}>
                    {elements.map((unit, index) => (
                      <Col className="game-unit" key={index}>
                        {unit}
                      </Col>
                    ))}
                  </Row>
                ))}
              </Col>
              <Col sm={5}>
                <Row>
                  <Col className="game-frame game-box mx-3 mb-4"></Col>
                  <Col className="game-frame game-box mx-3 mb-4 text-left">
                    {this.props.room.participants ? (
                      this.props.room.participants.map((player, index) => (
                        <Row>
                          <Col key={index}>{player.login}</Col>
                        </Row>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </Col>
                </Row>
                <Row id="other-fields">
                  <Col className="game-frame mx-3">
                    {contendersGrid.map((contenders, index) => (
                      <Row key={index}>
                        {contenders.map((unit, index) => (
                          <Col className="other-field" key={index}>
                            {unit}
                          </Col>
                        ))}
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
