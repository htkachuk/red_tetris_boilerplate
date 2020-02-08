import { REGISTER_RESULT } from "./eventTypes";

export const registerResult = token => {
  return {
    type: REGISTER_RESULT,
    token
  };
};
