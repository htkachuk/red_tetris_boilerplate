module.exports.joinRoomValidation = async (existedRoom, currentUser) => {
  if (existedRoom === null) {
    return { error: "Room doesn't exists", result: "error" };
  }
  if (existedRoom.participants.length === 6) {
    return { error: "Full room", result: "error" };
  }
  if (currentUser === null) {
    return { error: "user doesn't exists", result: "error" };
  }
  if (currentUser.roomName !== null) {
    return { error: "user has room", result: "error" };
  }
  if (existedRoom.participants.indexOf(currentUser.login) !== -1) {
    return {
      error: "user already is in room",
      result: "error"
    };
  }
  return { result: "ok" };
};

module.exports.loginValidation = async (currentUser, password) => {
  if (currentUser === null) {
    return { error: "user not exists", result: "error" };
  }
  if (currentUser.password !== password) {
    return { error: "wrong password", result: "error" };
  }
  return { result: "ok" };
};

module.exports.createRoomValidation = async (existedRoom, currentUser) => {
  if (existedRoom !== null) {
    return { error: "Room exists", result: "error" };
  }
  if (currentUser === null) {
    return { error: "user doesn't exists", result: "error" };
  }
  if (currentUser.roomName !== null) {
    return { error: "user has room", result: "error" };
  }

  return { result: "ok" };
};

module.exports.createUserValidation = async existedUser => {
  if (existedUser !== null) {
    return { error: "user exists", result: "error" };
  }
  return { result: "ok" };
};
