import { CREATE_ROOM } from "./eventTypes";

export const createRoom = (name, roomType, token) => {
  return {
    type: CREATE_ROOM,
    name,
    roomType,
    token
  };
};
