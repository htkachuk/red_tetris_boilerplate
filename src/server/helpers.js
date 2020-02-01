module.exports.joinRoomValidation = async (existedRoom, currentUser) => {
  if (existedRoom === null) {
    return JSON.stringify({ error: "Room doesn't exists", result: "error" });
  }
  if (existedRoom.participants.length === 6) {
    return JSON.stringify({ error: "Full room", result: "error" });
  }
  if (currentUser === null) {
    return JSON.stringify({ error: "user doesn't exists", result: "error" });
  }
  if (currentUser.roomName !== null) {
    return JSON.stringify({ error: "user has room", result: "error" });
  }
  if (existedRoom.participants.indexOf(currentUser.login) !== -1) {
    return JSON.stringify({
      error: "user already is in room",
      result: "error"
    });
  }
  return JSON.stringify({ result: "ok" });
};

module.exports.loginValidation = async (currentUser, password) => {
  if (currentUser === null) {
    return JSON.stringify({ error: "user not exists", result: "error" });
  }
  if (currentUser.password !== password) {
    return JSON.stringify({ error: "wrong password", result: "error" });
  }
  return JSON.stringify({ result: "ok" });
};

module.exports.createRoomValidation = async (existedRoom, currentUser) => {
  if (existedRoom !== null) {
    return JSON.stringify({ error: "Room exists", result: "error" });
  }
  if (currentUser === null) {
    return JSON.stringify({ error: "user doesn't exists", result: "error" });
  }
  if (currentUser.roomName !== null) {
    return JSON.stringify({ error: "user has room", result: "error" });
  }

  return JSON.stringify({ result: "ok" });
};

module.exports.createUserValidation = async existedUser => {
  if (existedUser !== null) {
    return JSON.stringify({ error: "user exists", result: "error" });
  }
  return JSON.stringify({ result: "ok" });
};
