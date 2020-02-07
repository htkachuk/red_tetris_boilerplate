import Cookies from "js-cookie";
import { SOCKET_CONNECTED } from "../actions/eventTypes";

const id = Cookies.get("user");
const initialState = id ? { user: { id } } : { user: { username: "" } };

const updateState = (state, updatedValues) => ({
  ...state,
  ...updatedValues
});

const loginHandlers = (state, action) => {
  Cookies.set("user", action.payload.id, { expires: 7 });
  return updateState(state, {
    user: { ...action.payload }
  });
};

const logoutHandler = state => {
  Cookies.remove("user");
  return updateState(state, {
    user: {
      id: 0,
      username: "",
      avatar: DEFAULT.AVATAR
    }
  });
};

const socketActions = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER_LOGIN:
      return loginHandlers(state, action);
    case ACTIONS.USER_REGISTER:
      return loginHandlers(state, action);
    case ACTIONS.USER_UPDATE:
      return updateState(state, { user: action.payload });
    case ACTIONS.USER_LOGOUT:
      return logoutHandler(state);
    case ACTIONS.USER_DELETE:
      return logoutHandler(state);
    default:
      return state;
  }
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case SOCKET_CONNECTED:
      return action.socket;
    default:
      return state;
  }
};

export default reducer;
