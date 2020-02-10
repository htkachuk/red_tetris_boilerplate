import * as eventTypes from "../actions/eventTypes";
import { registerResult } from "../actions/registerResult";
import { loginResult } from "../actions/loginResult";
import { updateRoom } from "../actions/updateRoom";
import { push } from "connected-react-router";

export const socketMiddleware = store => {
  const handleRegisterResult = (action, store) => {
    const actionObject = action.result;
    store.dispatch(registerResult(actionObject.token));
  };

  const handleLoginResult = (action, store) => {
    const actionObject = action.result;
    store.dispatch(loginResult(actionObject.token));
  };

  const handleJoinRoomResult = action => {
    const actionObject = action.result.room;
    store.dispatch(
      updateRoom(
        actionObject.name,
        actionObject.type,
        actionObject.participants
      )
    );
  };

  const handleCreateRoomResult = action => {
    const actionObject = action.result.room;
    store.dispatch(
      updateRoom(
        actionObject.name,
        actionObject.type,
        actionObject.participants
      )
    );
  };

  const handleLockRoomResult = action => {
    const actionObject = action.result.room;
    store.dispatch(
      updateRoom(
        actionObject.name,
        actionObject.type,
        actionObject.participants
      )
    );
    push("/game");
  };

  return next => action => {
    const storage = store.getState();
    let socket = storage.socket;
    switch (action.type) {
      case eventTypes.SOCKET_CONNECTED:
        socket = action.socket;
        socket.on(eventTypes.REGISTER_RESULT, a =>
          handleRegisterResult(a, store)
        );
        socket.on(eventTypes.LOGIN_RESULT, a => handleLoginResult(a, store));
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
