import { LOGIN } from "./eventTypes";

export const login = (login, password) => {
  return {
    type: LOGIN,
    login,
    password
  };
};
