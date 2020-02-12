import Piece from "./Piece";
import GREY from "../constants/colors";
import columnsCount from "../constants/board";

class Board {
  checkBoard(pieceX, pieceY, piece, newBoard, color) {
    for (let y in piece) {
      for (let x in piece[y]) {
        if (piece[y][x] === 1) {
          if (newBoard[pieceY + y][pieceX + x] != 0) {
            return false;
          } else {
            newBoard[pieceY + y][pieceX + x] = color;
          }
        }
      }
    }
    return newBoard;
  }

  moveBottom(board, piece) {
    piece.y += 1;

    if (piece.y > board.length) {
      piece.y -= 1;
      return { board, piece, neadNewPiece: true };
    }

    let newBoard = this.checkBoard(
      piece.x,
      piece.y,
      piece.piece[0],
      board,
      piece.color
    );
    if (newBoard === false) {
      piece.y -= 1;
      return { board, piece, neadNewPiece: true };
    }

    return { board: newBoard, piece, neadNewPiece: false };
  }

  moveLeft(board, piece) {
    let newPice = piece;
    newPice.piece = Piece.rotateLeft(newPice.piece);

    let newBoard = this.checkBoard(
      piece.x,
      piece.y,
      newPice.piece[0],
      board,
      piece.color
    );
    if (newBoard === false) {
      return { board, piece, neadNewPiece: true };
    }

    return { board: newBoard, piece: newPice, neadNewPiece: false };
  }

  moveRight(board, piece) {
    let newPice = piece;
    newPice.piece = Piece.rotateRight(newPice.piece);

    let newBoard = this.checkBoard(
      piece.x,
      piece.y,
      newPice.piece[0],
      board,
      piece.color
    );
    if (newBoard === false) {
      return { board, piece, neadNewPiece: true };
    }

    return { board: newBoard, piece: newPice, neadNewPiece: false };
  }

  addLine(board) {
    let newRow = [];
    for (let i = 0; i < columnsCount; i++) newRow.push(GREY);
    board.pop();
    board.push(newRow);
    return board;
  }

  removeLine(board, x) {
    let newRow = [];
    for (let i = 0; i < columnsCount; i++) newRow.push(0);
    board[x] = newRow;
    return board;
  }
}

export default Board;
