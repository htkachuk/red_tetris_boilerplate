import * as helpers from "./helpers";

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let client = new MongoClient(url);
const dbName = "red_tetris";
let db;
client.connect().then(client => {
  db = client.db(dbName);
});

module.exports.createUser = async action => {
  const users = db.collection("users");
  const existedUser = await users.findOne({ login: action.login });
  const validationResult = await helpers.createUserValidation(existedUser);
  if (validationResult.result !== "error") return validationResult;
  const user = {
    login: action.login,
    password: action.password,
    totalScore: 0,
    roomName: null,
    connection: action.id
  };
  const result = await users.insertOne(user);
  return JSON.stringify({ result: result["ops"] });
};

module.exports.createRoom = async action => {
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
  const user = await users.findOne({ login: action.login });
  const validationResult = await helpers.loginValidation(user, action.password);

  if (validationResult.result !== "error") return validationResult;
  user.connection = action.id;
  const result = await users.findOneAndUpdate(
    { login: action.login },
    { $set: user }
  );
  return JSON.stringify({ result });
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
