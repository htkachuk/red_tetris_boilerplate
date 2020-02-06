import { REGISTER } from "./eventTypes";

export const register = (login, password) => {
  return {
    type: REGISTER,
    login,
    password
  };
};
