import { ALERT_POP } from "../actions/alert";

const reducer = (state = {}, action) => {
  console.log("MAGIC!!!!!");
  switch (action.type) {
    case "SOCKET_CONNECTED":
      console.log("In reducer");
      console.log(state);
      console.log(action);
      return { socket: action.socket };
    default:
      console.log(action.type);
      return state;
  }
};

export default reducer;
