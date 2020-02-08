import { JOIN_ROOM, CREATE_ROOM, UPDATE_ROOM } from "../actions/eventTypes";

const reducer = (
  state = {
    name: null,
    participants: null
  },
  action
) => {
  switch (action.type) {
    case JOIN_ROOM:
    case CREATE_ROOM:
      return { ...state, name: action.name };
    case UPDATE_ROOM:
      return {
        ...state,
        name: action.name,
        type: action.roomType,
        participants: action.participants
      };
    default:
      return state;
  }
};

export default reducer;
