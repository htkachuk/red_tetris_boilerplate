import { LOCK_ROOM } from "./eventTypes";

export const lockRoom = token => {
  return {
    type: LOCK_ROOM,
    token
  };
};
