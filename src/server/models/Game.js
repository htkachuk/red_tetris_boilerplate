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

  async getFirstShapes() {
    let shapeArray = [new Piece(), new Piece(), new Piece()];
    for (let index in this.room.participants) {
      this.room.participants[index].shapes = shapeArray;
    }
    await databaseInstance.storeUpdatedRoom(this.room);
  }

  async initGame() {
    this.room = await databaseInstance.getRoomByName(this.roomName);
    await this.getFirstShapes();

    // for (let i = 3; i > 0; i--) {
    //   DelayNode(1000);
    // }
  }

  checkHowManyPlayersInGame() {
    let activePlayers = 0;

    for (let index in this.room.participants) {
      if (this.room.participants[index].inGame === true) activePlayers += 1;
    }
    return activePlayers;
  }

  addLine(notAddToHim, count) {
    for (let index = 0; index < this.room.participants.length; index++) {
      if (this.room.participants[index].login !== notAddToHim) {
        this.boardObj.addLine(this.room.participants[index].board, count);
      }
    }
  }

  async removeAndAddToOther() {
    let smthChange = false;
    for (let index = 0; index < this.room.participants.length; index++) {
      const checkResult = this.boardObj.checkFullLines(
        this.room.participants[index].board
      );
      if (checkResult.counter > 0) {
        smthChange = true;
        this.addLine(this.room.participants[index].login, checkResult.counter);
      }
    }
    if (smthChange === true) {
      io.sockets.in(this.room.name).emit(eventTypes.UPDATE_STATS, {
        type: eventTypes.UPDATE_STATS,
        room: this.room
      });
      await databaseInstance.storeUpdatedRoom(this.room);
    }
  }

  async startGame() {
    this.idInterval = setIntervalAsync(async () => {
      this.room = await databaseInstance.getRoomByName(this.roomName);
      await this.removeAndAddToOther();
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
      if (this.checkHowManyPlayersInGame() > 0)
        io.sockets.in(this.room.name).emit(eventTypes.UPDATE_STATS, {
          type: eventTypes.UPDATE_STATS,
          room: this.room
        });
      else this.endGame();
      await databaseInstance.storeUpdatedRoom(this.room);
    }, 500);
  }

  endGame() {
    io.sockets.in(this.room.name).emit(eventTypes.END_GAME, {
      type: eventTypes.END_GAME
    });
    console.log("GAME OVER");
    clearIntervalAsync(this.idInterval);
  }

  async movePiece(player, movingType) {
    this.room = await databaseInstance.getRoomByName(this.roomName);

    for (let index = 0; index < this.room.participants.length; index++) {
      if (this.room.participants[index].login === player) {
        const result = movingType(
          JSON.parse(
            JSON.stringify(this.room.participants[index].board)
          ),
          JSON.parse(
            JSON.stringify(this.room.participants[index].shapes[0]))
        );
        this.room.participants[index].board  = result.board;
        this.room.participants[index].shapes[0] = result.piece;
        await databaseInstance.storeUpdatedRoom(this.room);
        io.sockets.in(this.room.name).emit(eventTypes.UPDATE_STATS, {
          type: eventTypes.UPDATE_STATS,
          room: this.room
        });
        break;
      }
    }
  }

  // async rotateRight(player) {
  //   this.room = await databaseInstance.getRoomByName(this.roomName);

  //   for (let index = 0; index < this.room.participants.length; index++) {
  //     if (this.room.participants[index].login === player) {
  //       let board = JSON.parse(
  //         JSON.stringify(this.room.participants[index].board)
  //       );
  //       this.room.participants[index].board = this.boardObj.rotateRight(
  //         board,
  //         this.room.participants[index].shapes[0]
  //       );
  //       await databaseInstance.storeUpdatedRoom(this.room);
  //       io.sockets.in(this.room.name).emit(eventTypes.UPDATE_STATS, {
  //         type: eventTypes.UPDATE_STATS,
  //         room: this.room
  //       });
  //       break;
  //     }
  //   }
  // }

  // async moveLeft(player) {
  //   this.room = await databaseInstance.getRoomByName(this.roomName);

  //   for (let index = 0; index < this.room.participants.length; index++) {
  //     if (this.room.participants[index].login === player) {
  //       let board = JSON.parse(
  //         JSON.stringify(this.room.participants[index].board)
  //       );
  //       this.room.participants[index].board = this.boardObj.moveLeft(
  //         board,
  //         this.room.participants[index].shapes[0]
  //       );
  //       await databaseInstance.storeUpdatedRoom(this.room);
  //       io.sockets.in(this.room.name).emit(eventTypes.UPDATE_STATS, {
  //         type: eventTypes.UPDATE_STATS,
  //         room: this.room
  //       });
  //       break;
  //     }
  //   }
  // }
  // async moveRight(player) {
  //   this.room = await databaseInstance.getRoomByName(this.roomName);

  //   for (let index = 0; index < this.room.participants.length; index++) {
  //     if (this.room.participants[index].login === player) {
  //       let board = JSON.parse(
  //         JSON.stringify(this.room.participants[index].board)
  //       );
  //       this.room.participants[index].board = this.boardObj.moveRight(
  //         board,
  //         this.room.participants[index].shapes[0]
  //       );
  //       await databaseInstance.storeUpdatedRoom(this.room);
  //       io.sockets.in(this.room.name).emit(eventTypes.UPDATE_STATS, {
  //         type: eventTypes.UPDATE_STATS,
  //         room: this.room
  //       });
  //       break;
  //     }
  //   }
  // }
}

export default Game;
