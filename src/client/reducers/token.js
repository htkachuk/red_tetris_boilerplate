import { REGISTER_RESULT } from "../actions/eventTypes";
import { LOGIN_RESULT } from "../actions/eventTypes";

const reducer = (state = null, action) => {
  switch (action.type) {
    case REGISTER_RESULT:
    case LOGIN_RESULT:
      return action.token;
    default:
      return state;
  }
};

export default reducer;
