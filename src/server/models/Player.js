import { rowsCount, columnsCount } from "../constants/board";
import { decodeJWT } from "../auth";
import { db } from "../db";
import Piece from "./Piece";

class Player {
  constructor() {
    this.board = this.newBoard;
    this.rowsCount = rowsCount;

    // this.piecesArray = new Piece[3]();
  }

  static newBoard() {
    let board = [];

    for (let i = 0; i < rowsCount; i++) {
      let row = [];
      for (let j = 0; j < columnsCount; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  static joinRoom = async action => {
    let token = decodeJWT(action.token);
    const rooms = db.collection("rooms");
    let existedRoom = await rooms.findOne({ name: action.name });
    const users = db.collection("users");
    let currentUser = await users.findOne({ login: token.data.login });

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
    currentUser.roomName = action.name;
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
}

export default Player;
