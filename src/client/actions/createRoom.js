import { CREATE_ROOM } from "./eventTypes";

export const createRoom = name => {
  return {
    type: CREATE_ROOM,
    name
  };
};
