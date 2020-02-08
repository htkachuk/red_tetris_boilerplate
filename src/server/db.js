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
  const validationResult = await helpers.createUserValidation(existedUser);
  if (validationResult.result === "error")
    return JSON.stringify(validationResult);
  const user = {
    login: action.login,
    password: await argon2.hash(action.password),
    totalScore: 0,
    roomName: null,
    connection: action.id
  };
  const result = await users.insertOne(user);
  return JSON.stringify({
    token: generateJWT(user)
  });
};

module.exports.createRoom = async action => {
  console.log(decodeJWT(action.token));
  const rooms = db.collection("rooms");
  const existedRoom = await rooms.findOne({ name: action.name });
  const users = db.collection("users");
  const currentUser = await users.findOne({ connection: action.id });
  const validationResult = await helpers.createRoomValidation(
    existedRoom,
    currentUser
  );
  if (validationResult.result !== "error") return validationResult;

  currentUser.room = action.name;
  const room = {
    name: action.name,
    participants: [currentUser.login],
    leader: currentUser.login
  };
  const resultRoom = await rooms.insertOne(room);
  await users.findOneAndUpdate(
    { connection: action.id },
    { $set: currentUser }
  );
  return JSON.stringify({ result: resultRoom["ops"] });
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
  return JSON.stringify({ token: generateJWT(user) });
};

module.exports.joinRoom = async action => {
  const rooms = db.collection("rooms");
  const existedRoom = await rooms.findOne({ name: action.name });
  const users = db.collection("users");
  const currentUser = await users.findOne({ connection: action.id });
  const validationResult = await helpers.joinRoomValidation(
    existedRoom,
    currentUser
  );
  if (validationResult.result !== "error") return validationResult;

  existedRoom.participants.push(currentUser.login);
  currentUser.room = action.name;
  await users.findOneAndUpdate(
    { connection: action.id },
    { $set: currentUser }
  );
  const resultRoom = await rooms.findOneAndUpdate(
    { name: action.name },
    { $set: existedRoom }
  );
  return JSON.stringify({ result: resultRoom["ops"] });
};
