const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let client = new MongoClient(url);
const dbName = "red_tetris";
let db;
client.connect().then(client => {
  db = client.db(dbName);
});

module.exports.getUser = async (req, res) => {
  let users = db.collection("users");
  let result = await users.findOne({ login: req.body.login });
  res.json({ result: result });
  return res;
};

module.exports.createUser = async action => {
  let users = db.collection("users");
  let existedUser = await users.findOne({ login: action.login });
  if (existedUser !== null) {
    console.log(existedUser);
    return JSON.stringify({ error: "user exists" });
  } else {
    let user = {
      login: action.login,
      password: action.password,
      totalScore: 0,
      roomName: null,
      connection: action.id
    };
    let result = await users.insertOne(user);
    console.log(result);
    return JSON.stringify({ result: result["ops"] });
  }
};

module.exports.loginUser = async action => {
  let users = db.collection("users");
  let user = await users.findOne({ login: action.login });
  if (user === null) {
    console.log(user);
    return JSON.stringify({ error: "user not exists" });
  } else if (user.password !== action.password) {
    return JSON.stringify({ error: "wrong password" });
  } else {
    user.connection = action.id;
    result = await events.findOneAndUpdate(
      { login: action.login },
      { $set: user }
    );
    return JSON.stringify({ result });
  }
};

module.exports.updateUser = async (req, res) => {
  let users = db.collection("users");
  let user = await users.findOne({ login: req.body.login });
  if (user !== None) {
    res.json({ error: "user exists" });
  } else {
    user.totalScore = req.body.totalScore;
    result = await events.findOneAndUpdate(
      { login: user.login },
      { $set: user }
    );
    res.json({ result: result });
  }
  return res;
};

module.exports.deleteUser = async (req, res) => {
  let users = db.collection("users");
  let result = await users.findOneAndDelete({ login: req.body.login });
  res.json({ result: result });
  return res;
};
module.exports.getRoom = async (req, res) => {
  let rooms = db.collection("rooms");
  let result = await rooms.findOne({ name: req.body.name });
  res.json({ result: result });
  return res;
};

module.exports.createRoom = async (req, res) => {
  let rooms = db.collection("rooms");
  if ((await rooms.findOne({ name: req.body.name })) !== None) {
    res.json({ error: "user doesn't exists" });
  } else {
    let room = {
      name: req.body.mame,
      participants: []
    };
    let result = await rooms.insertOne(room);
    res.json({ result: result["ops"] });
  }
  return res;
};

module.exports.updateRoom = async (req, res) => {
  let rooms = db.collection("rooms");
  let room = await rooms.findOne({ name: req.body.name });
  if (room !== None) {
    res.json({ error: "room doesn't exists" });
  } else {
    room.participants = req.body.participants;
    result = await events.findOneAndUpdate(
      { name: req.body.name },
      { $set: room }
    );
    res.json({ result: result });
  }
  return res;
};

module.exports.deleteRoom = async (req, res) => {
  let rooms = db.collection("rooms");
  let result = await rooms.findOneAndDelete({ name: req.body.name });
  res.json({ result: result });
  return res;
};
