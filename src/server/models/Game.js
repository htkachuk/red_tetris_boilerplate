// import { pieces } from "../constants/pieces";
// import colors from "../constants/colors";
import Piece from "./Piece";
import Board from "./Board";
import { io } from "../index";
import * as eventTypes from "../eventTypes";
import * as databaseInstance from "../db";

import { setIntervalAsync } from "set-interval-async/fixed";
import { clearIntervalAsync } from "set-interval-async";

class Game {
  constructor(name) {
    this.idInterval;

    // this.playersBoard;
    // this.newPieces = [new Piece(), new Piece(), new Piece()];
    this.roomName = name;
    this.room;
    this.boardObj = new Board();
  }

  getNewShapeForPlayers() {
    let newShape = new Piece();
    for (let index in this.room.participants) {
      this.room.participants[index].shapes.push(newShape);
    }
  }

  getFirstShapes() {
    let shapeArray = [new Piece(), new Piece(), new Piece()];
    for (let index in this.room.participants) {
      this.room.participants[index].shapes = shapeArray;
    }
    databaseInstance.storeUpdatedRoom(this.room);
  }

  async initGame() {
    this.room = databaseInstance.getRoomByName(this.roomName);

    // for (let i = 3; i > 0; i--) {
    //   DelayNode(1000);
    // }
  }

  async startGame() {
    this.idInterval = setIntervalAsync(async () => {
      this.room = databaseInstance.getRoomByName(this.roomName);
      for (let index = 0; index < this.room.participants.length; index++) {
        let board = JSON.parse(
          JSON.stringify(this.room.participants[index].board)
        );
        let moveResult = this.boardObj.moveBottom(
          board,
          this.room.participants[index].shapes[0],
          20
        );

        if (moveResult.gameOver === true) {
          this.room.participants[index].inGame = false;
        }
        if (moveResult.neadNewPiece === false)
          this.room.participants[index].board = moveResult.board;
        else {
          this.getNewShapeForPlayers();
          this.room.participants[index].shapes.splice(0, 1);
        }
      }
      io.sockets.in(room.name).emit(eventTypes.UPDATE_STATS, {
        type: eventTypes.UPDATE_STATS,
        room: this.room
      });
      databaseInstance.storeUpdatedRoom(this.room);
    }, 500);
  }

  endGame() {
    io.sockets.in(result.room.name).emit(eventTypes.END_GAME, {
      type: eventTypes.END_GAME
    });
    console.log("GAME OVER");
    clearIntervalAsync(this.idInterval);
  }
}

export default Game;
