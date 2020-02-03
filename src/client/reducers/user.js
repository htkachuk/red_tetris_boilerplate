import { REGISTER } from "../actions/register";
import { LOGIN } from "../actions/login";

const reducer = (
  state = {
    login: null,
    password: null,
    totalScore: null
  },
  action
) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return { ...state, login: action.login, password: action.password };
    default:
      return state;
  }
};

export default reducer;
