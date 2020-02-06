import * as reducers from "../reducers";
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
      case eventTypes.SOCKET_CONNECTED:
        socket = action.socket;
        socket.on(eventTypes.REGISTER_RESULT, handleRegisterResult);
        socket.on(eventTypes.LOGIN_RESULT, handleLoginResult);
        socket.on(eventTypes.CREATE_ROOM_RESULT, handleCreateRoomResult);
        socket.on(eventTypes.JOIN_ROOM_RESULT, handleJoinRoomResult);
        socket.on(eventTypes.LOCK_ROOM_RESULT, handleLockRoomResult);
        break;
      case eventTypes.REGISTER:
        socket.emit(action.type, action);
        break;
      case eventTypes.LOGIN:
        socket.emit(action.type, action);
        break;
      case eventTypes.CREATE_ROOM:
        socket.emit(action.type, action);
        break;
      case eventTypes.CREATE_ROOM:
        socket.emit(action.type, action);
        break;
      case eventTypes.JOIN_ROOM:
        socket.emit(action.type, action);
        break;
      case eventTypes.LOCK_ROOM:
        socket.emit(action.type, action);
        break;
    }
    return next(action);
  };
};
