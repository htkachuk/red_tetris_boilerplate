import { rowsCount, columnsCount } from "../constants/board";

class Player {
  constructor(currentGame) {
    this.game = currentGame;
    this.score = 0;
    this.board = this.newBoard();
  }

  newBoard() {
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
}

export default Player;
