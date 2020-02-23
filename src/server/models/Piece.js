import colors from "../constants/colors";
import pieces from "../constants/pieces";

class Piece {
  constructor() {
    const index = Math.floor(Math.random() * Math.floor(pieces.pieces.length));
    this.color = colors.colors[index];
    this.x = 3;
    this.y = -1;
    this.piece = pieces.pieces[index];
    this.index = index;
  }

  rotateLeft() {
    return this.piece.push(this.piece.shift());
  }

  rotateRight() {
    let oldPiece = this.piece;
    return this.piece.unshift(oldPiece.splice(2, 1));
  }
}

export default Piece;
