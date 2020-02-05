import * as reducers from "../reducers";
import { REGISTER } from "../actions/register";
import { LOGIN } from "../actions/login";
import * as eventTypes from "../actions/eventTypes";

export const socketMiddleware = store => {
  const handleRegisterResult = action => {
    console.log(action);
  };

  const handleLoginResult = action => {
    console.log("IT TOO!");
  };

  const handleJoinRoomResult = action => {
    console.log("IT WORKS!");
  };

  const handleCreateRoomResult = action => {
    console.log("IT TOO!");
  };

  const handleLockRoomResult = action => {
    console.log("IT TOO!");
  };

  return next => action => {
    const storage = store.getState();
    let socket = storage.socket;
    switch (action.type) {
      case "SOCKET_CONNECTED":
        socket = action.socket;
        socket.on(eventTypes.REGISTER_RESULT, handleRegisterResult);
        socket.on(eventTypes.LOGIN_RESULT, handleLoginResult);
        socket.on(eventTypes.CREATE_ROOM_RESULT, handleCreateRoomResult);
        socket.on(eventTypes.JOIN_ROOM_RESULT, handleJoinRoomResult);
        socket.on(eventTypes.LOCK_ROOM_RESULT, handleLockRoomResult);
        break;
      case REGISTER:
        socket.emit(REGISTER, action);
        break;
      case LOGIN:
        socket = store.socket;
        socket.emit(LOGIN, action);
        // socket.send(
        //   JSON.stringify({ command: action.type, message: action.message })
        // );
        break;
    }
    return next(action);
  };
};
