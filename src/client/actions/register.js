export const REGISTER = 'REGISTER'

export const register = (login, password) => {
  return {
    type: REGISTER,
    login,
    password
  }
}

