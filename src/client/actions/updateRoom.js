import { UPDATE_ROOM } from "./eventTypes";

export const updateRoom = (name, roomType, participants) => {
  return {
    type: UPDATE_ROOM,
    name,
    roomType,
    participants
  };
};
