import * as jwt from "jsonwebtoken";
const SECRET = "MySuP3R_z3kr3t";

module.exports.generateJWT = user => {
  const data = {
    login: user.login,
    totalScore: user.totalScore,
    roomName: user.roomName,
    connection: user.connection
  };
  const expiration = "6h";
  return jwt.sign({ data }, SECRET, { expiresIn: expiration });
};

module.exports.decodeJWT = token => jwt.verify(token, SECRET);
