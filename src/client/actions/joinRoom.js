import { JOIN_ROOM } from "./eventTypes";

export const joinRoom = (name, token) => {
  return {
    type: JOIN_ROOM,
    name,
    token
  };
};
