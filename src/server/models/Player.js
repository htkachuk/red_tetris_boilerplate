import { rowsCount, columnsCount } from "../constants/board";

class Player {
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
