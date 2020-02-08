import * as helpers from "./helpers";
import * as argon2 from "argon2";
import { generateJWT, decodeJWT } from "./auth";

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "red_tetris";
let db;

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
    roomName: null
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
  const currentUser = await users.findOne({ login: token.data.login });

  if (existedRoom !== null) {
    return { error: "room exists", result: "error" };
  }
  if (currentUser === null) {
    return { error: "user doesn't exists", result: "error" };
  }
  if (currentUser.roomName !== null) {
    return { error: "user has room", result: "error" };
  }

  currentUser.room = action.name;
  const room = {
    name: action.name,
    participants: [currentUser.login],
    leader: currentUser.login
  };
  const resultRoom = await rooms.insertOne(room);
  await users.findOneAndUpdate(
    { name: token.data.login },
    { $set: currentUser }
  );
  existedRoom = await rooms.findOne({ name: action.name });
  return { room: existedRoom };
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

module.exports.joinRoom = async action => {
  let token = decodeJWT(action.token);
  const rooms = db.collection("rooms");
  let existedRoom = await rooms.findOne({ name: action.name });
  const users = db.collection("users");
  const currentUser = await users.findOne({ login: token.data.login });

  if (existedRoom === null) {
    return { error: "Room doesn't exists", result: "error" };
  }
  if (existedRoom.participants.length === 6) {
    return { error: "Full room", result: "error" };
  }
  if (currentUser === null) {
    return { error: "user doesn't exists", room: "error" };
  }
  if (currentUser.roomName !== null) {
    return { error: "user has room", result: "error" };
  }

  existedRoom.participants.push(currentUser.login);
  currentUser.room = action.name;
  await users.findOneAndUpdate(
    { login: token.data.login },
    { $set: currentUser }
  );
  const resultRoom = await rooms.findOneAndUpdate(
    { name: action.name },
    { $set: existedRoom }
  );
  existedRoom = await rooms.findOne({ name: action.name });
  return { room: existedRoom };
};
