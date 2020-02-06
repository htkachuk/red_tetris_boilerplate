import { JOIN_ROOM } from "./eventTypes";

export const joinRoom = name => {
  return {
    type: JOIN_ROOM,
    name
  };
};
