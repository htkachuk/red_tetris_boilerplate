import * as argon2 from "argon2";
import { generateJWT, decodeJWT } from "./auth";
import Player from "./models/Player";

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "red_tetris";
export let db;

client.connect().then(client => {
  db = client.db(dbName);
});

module.exports.createUser = async action => {
  const users = db.collection("users");
  const existedUser = await users.findOne({ login: action.login });

  if (existedUser !== null) {
    return { error: "user exists", result: "error" };
  }

  const user = {
    login: action.login,
    password: await argon2.hash(action.password),
    totalScore: 0,
    roomName: null,
    board: Player.newBoard()
  };
  await users.insertOne(user);
  return {
    token: generateJWT(user)
  };
};

module.exports.createRoom = async action => {
  let token = decodeJWT(action.token);
  const rooms = db.collection("rooms");
  let existedRoom = await rooms.findOne({ name: action.name });
  const users = db.collection("users");
  let currentUser = await users.findOne({ login: token.data.login });

  if (existedRoom !== null) {
    return { error: "room exists", result: "error" };
  }
  if (currentUser === null) {
    return { error: "user doesn't exists", result: "error" };
  }

  // if (currentUser.roomName !== null) {
  //   return { error: "user has room", result: "error" };
  // }

  const room = {
    name: action.name,
    participants: [currentUser.login],
    leader: currentUser.login,
    isStarted: false
  };
  const resultRoom = await rooms.insertOne(room);
  currentUser.roomName = action.name;
  await users.findOneAndUpdate(
    { login: token.data.login },
    { $set: currentUser }
  );
  existedRoom = await rooms.findOne({ name: action.name });
  return { room: existedRoom, result: "ok" };
};

module.exports.loginUser = async action => {
  const users = db.collection("users");
  let user = await users.findOne({ login: action.login });
  if (user === null) {
    return { error: "user not exists", result: "error" };
  }
  const correctPassword = await argon2.verify(user.password, action.password);
  if (!correctPassword) {
    return { error: "wrong password", result: "error" };
  }
  user.connection = action.id;
  await users.findOneAndUpdate({ login: action.login }, { $set: user });
  user = await users.findOne({ login: action.login });
  return { token: generateJWT(user) };
};

module.exports.lockRoom = async action => {
  let token = await decodeJWT(action.token);
  const rooms = db.collection("rooms");
  const users = db.collection("users");
  const currentUser = await users.findOne({ login: token.data.login });

  if (currentUser === null) {
    return { error: "user doesn't exists", result: "error" };
  }

  const roomName = currentUser.roomName;
  let existedRoom = await rooms.findOne({ name: roomName });

  if (existedRoom === null) {
    return { error: "Room doesn't exists", result: "error" };
  }
  if (existedRoom.leader !== currentUser.login) {
    return { error: "permission denied", result: "error" };
  }

  // if (existedRoom.isStarted === true) {
  //   return { error: "game have been started", result: "error" };
  // }

  existedRoom.isStarted = true;
  await rooms.findOneAndUpdate({ name: roomName }, { $set: existedRoom });
  existedRoom = await rooms.findOne({ name: roomName });
  return { room: existedRoom, result: "ok" };
};

module.exports.getUsersBoard = async room => {
  const users = db.collection("users");
  let boards = [];

  for (let index in room.participants) {
    let currentUser = await users.findOne({ login: room.participants[index] });
    boards.push(currentUser.board);
  }
  return boards;
};
