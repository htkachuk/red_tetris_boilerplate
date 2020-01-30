export const LOGIN = "LOGIN";

export const login = (login, password) => {
  return {
    type: LOGIN,
    login,
    password
  };
};
