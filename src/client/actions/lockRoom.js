import { LOCK_ROOM } from "./eventTypes";

export const lockRoom = () => {
  return {
    type: LOCK_ROOM
  };
};
