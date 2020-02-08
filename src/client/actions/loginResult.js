import { LOGIN_RESULT } from "./eventTypes";

export const loginResult = token => {
  return {
    type: LOGIN_RESULT,
    token
  };
};
