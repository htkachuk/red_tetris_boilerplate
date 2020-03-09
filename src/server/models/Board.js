import Piece from "./Piece";
import GREY from "../constants/colors";
import columnsCount from "../constants/board";

class Board {
  constructor() {}

  checkBoard(pieceX, pieceY, piece, board, color) {
    for (let y in piece) {
      for (let x in piece[y]) {
        if (piece[y][x] === 1) {
          if (board[pieceY + parseInt(y, 10)][pieceX + parseInt(x, 10)] !== 0) {
            return false;
          } else {
            board[pieceY + parseInt(y, 10)][pieceX + parseInt(x, 10)] = color;
          }
        }
      }
    }
    return board;
  }

  removeOldPiece(board, pieceX, pieceY, piece) {
    if (pieceX < 0 || pieceY < 0) {
      return board;
    } 
    for (let y in piece) {
      for (let x in piece[y]) {
        if (piece[y][x] === 1) {
          board[pieceY + parseInt(y, 10)][pieceX + parseInt(x, 10)] = 0;
        }
      }
    }
    return board;
  }

  moveBottom(board, piece, rowsCount) {
    // console.log("Board come:\n\n", board);
    piece.y += 1;

    const boardCopy = JSON.parse(JSON.stringify(board));

    if (piece.y + piece.piece[0].length > rowsCount) {
      piece.y -= 1;
      return { boardCopy, neadNewPiece: true, gameOver: false };
    }

    let newBoard = this.removeOldPiece(
      boardCopy,
      piece.x,
      piece.y - 1,
      piece.piece[0]
    );

    let newPositionBoard = this.checkBoard(
      piece.x,
      piece.y,
      piece.piece[0],
      newBoard,
      piece.color
    );

    if (newPositionBoard === false) {
      piece.y -= 1;
      if (piece.y === -1)
        return { board, piece, neadNewPiece: true, gameOver: true };
      return { board, piece, neadNewPiece: true, gameOver: false };
    }
    return {
      board: newPositionBoard,
      piece,
      neadNewPiece: false,
      gameOver: false
    };
  }

  rotateLeft(board, piece) {
    let newPice =  JSON.parse(JSON.stringify(piece));
    newPice.rotateLeft();

    let newBoard = this.checkBoard(
      newPice.x,
      newPice.y,
      newPice.piece[0],
      JSON.parse(JSON.stringify(board)),
      newPice.color
    );
    if (newBoard === false) {
      return board, piece;
    }
    return newBoard, newPice;
  }

  rotateRight(board, piece) {
    let newPice =  JSON.parse(JSON.stringify(piece));
    newPice.rotateRight();

    let newBoard = this.checkBoard(
      newPice.x,
      newPice.y,
      newPice.piece[0],
      JSON.parse(JSON.stringify(board)),
      newPice.color
    );
    if (newBoard === false) {
      return board, piece;
    }

    return newBoard, newPice;
  }

  addLine(board, count) {
    let newRow = [];
    for (let i = 0; i < columnsCount; i++) newRow.push(GREY);
    for (let i = 0; i < count; i++) {
      board.pop();
      board.push(newRow);
    }
    return board;
  }

  removeLine(board, y) {
    let newRow = [];
    for (let i = 0; i < columnsCount; i++) newRow.push(0);
    board[y] = newRow;
    return board;
  }

  checkFullLines(board) {
    let counter = 0;

    for (let y in board) {
      let fullLine = true;
      for (let x in board[y]) {
        if (board[y][x] === 0) {
          fullLine = false;
          break;
        }
        if (fullLine === true) {
          board = this.removeLine(board, y);
          counter += 1;
        }
      }
    }
    return board, counter;
  }
}

export default Board;
