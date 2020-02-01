const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let client = new MongoClient(url);
const dbName = "red_tetris";
let db;
client.connect().then(client => {
  db = client.db(dbName);
});

module.exports.getUser = async action => {
  let users = db.collection("users");
  let existedUser = await users.findOne({ login: action.login });
  console.log(action.login);
  if (existedUser !== null) {
    console.log(existedUser);
    return JSON.stringify({ error: "user exists" });
  } else return JSON.stringify({ error: "other result" });
};

module.exports.createUser = async action => {
  const users = db.collection("users");
  const existedUser = await users.findOne({ login: action.login });
  if (existedUser !== null) {
    return JSON.stringify({ error: "user exists" });
  } else {
    let user = {
      login: action.login,
      password: action.password,
      totalScore: 0,
      roomName: null,
      connection: action.id
    };
    const result = await users.insertOne(user);
    return JSON.stringify({ result: result["ops"] });
  }
};

module.exports.createRoom = async action => {
  const rooms = db.collection("rooms");
  const existedRoom = await rooms.findOne({ name: action.name });
  if (existedRoom !== null) {
    return JSON.stringify({ error: "Room exists" });
  } else {
    const users = db.collection("users");
    const currentUser = await users.findOne({ connection: action.id });
    if (currentUser === null)
      return JSON.stringify({ error: "user doesn't exists" });
    const room = {
      name: action.name,
      participants: [currentUser.login],
      leader: currentUser.login
    };
    const result = await rooms.insertOne(room);
    return JSON.stringify({ result: result["ops"] });
  }
};

module.exports.loginUser = async action => {
  const users = db.collection("users");
  const user = await users.findOne({ login: action.login });
  console.log("User is: ", user);
  if (user === null) {
    return JSON.stringify({ error: "user not exists" });
  } else if (user.password !== action.password) {
    return JSON.stringify({ error: "wrong password" });
  } else {
    user.connection = action.id;
    const result = await users.findOneAndUpdate(
      { login: action.login },
      { $set: user }
    );
    return JSON.stringify({ result });
  }
};

// module.exports.updateUser = async (req, res) => {
//   const users = db.collection("users");
//   const user = await users.findOne({ login: req.body.login });
//   if (user !== null) {
//     res.json({ error: "user exists" });
//   } else {
//     user.totalScore = req.body.totalScore;
//     const result = await events.findOneAndUpdate(
//       { login: user.login },
//       { $set: user }
//     );
//     res.json({ result });
//   }
//   return res;
// };

// module.exports.deleteUser = async (req, res) => {
//   const users = db.collection("users");
//   const result = await users.findOneAndDelete({ login: req.body.login });
//   res.json({ result });
//   return res;
// };

module.exports.getRoom = async (req, res) => {
  const rooms = db.collection("rooms");
  const result = await rooms.findOne({ name: req.body.name });
  res.json({ result });
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
    res.json({ result });
  }
  return res;
};

module.exports.deleteRoom = async (req, res) => {
  let rooms = db.collection("rooms");
  let result = await rooms.findOneAndDelete({ name: req.body.name });
  res.json({ result });
  return res;
};
