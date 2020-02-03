import { JOIN_ROOM } from "../actions/joinRoom";
import { CREATE_ROOM } from "../actions/createRoom";

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
    default:
      return state;
  }
};

export default reducer;
