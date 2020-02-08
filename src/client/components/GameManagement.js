import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createRoom } from "../actions/createRoom";
import { joinRoom } from "../actions/joinRoom";

class GameManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.validateCreateRoomForm = this.validateCreateRoomForm.bind(this);
    this.validateJoinRoomForm = this.validateJoinRoomForm.bind(this);
    this.handleCreationNameChange = this.handleCreationNameChange.bind(this);
    this.handleJointNameChange = this.handleJointNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.state = {
      creationName: "",
      jointName: "",
      type: ""
    };
  }

  validateCreateRoomForm() {
    return this.state.creationName.length > 0 && this.state.type.length > 0;
  }

  validateJoinRoomForm() {
    return this.state.jointName.length > 0;
  }

  handleCreationNameChange(e) {
    this.setState({ creationName: e.target.value });
  }

  handleJointNameChange(e) {
    this.setState({ jointName: e.target.value });
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="txt-secondary">Game Management</div>
        <form
          onSubmit={() => {
            event.preventDefault();
            this.props.createRoom(
              this.state.creationName,
              this.state.type,
              this.props.token
            );
          }}
        >
          <Form.Group>
            <Form.Control
              className="input-std"
              type="text"
              placeholder="Name"
              value={this.state.creationName}
              onChange={this.handleCreationNameChange}
            />
            <Form.Control
              as="select"
              className="input-std"
              onChange={this.handleTypeChange}
            >
              <option>Solo</option>
              <option>Multiplayer</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="danger"
            className="btn-std"
            disabled={!this.validateCreateRoomForm()}
            type="submit"
          >
            Create Game
          </Button>
        </form>
        <form
          onSubmit={() => {
            event.preventDefault();
            this.props.joinRoom(this.state.jointName, this.props.token);
          }}
        >
          <Form.Group>
            <Form.Control
              className="input-std"
              type="text"
              placeholder="Name"
              value={this.state.jointName}
              onChange={this.handleJointNameChange}
            />
          </Form.Group>
          <Button
            variant="danger"
            className="btn-std"
            disabled={!this.validateJoinRoomForm()}
            type="submit"
          >
            Join Rooms
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
      createRoom: (name, type, token) => {
        dispatch(createRoom(name, type, token));
        return push("/waiting");
      },
      joinRoom: (name, token) => {
        dispatch(joinRoom(name, token));
        return push("/waiting");
      }
    },
    dispatch
  );

const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps, mapDispatchToProps)(GameManagementPage);
