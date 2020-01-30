import React from 'react'
import {wsConnect} from '../middleware/socketMiddleware'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      response: props.message,
      endpoint: "http://0.0.0.0:3004"
    };
  }
  
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
  }

  render() {
    const { response } = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          {response
              ? <p>
                The temperature in Florence is: {response} °F
              </p>
              : <p>Loading...</p>}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


