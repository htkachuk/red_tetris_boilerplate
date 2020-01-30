export const CREATE_ROOM = "CREATE_ROOM";

export const createRoom = name => {
  return {
    type: CREATE_ROOM,
    name
  };
};
