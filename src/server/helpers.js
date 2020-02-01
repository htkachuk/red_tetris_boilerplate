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
