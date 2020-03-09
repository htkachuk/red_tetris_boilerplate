import colors from "../constants/colors";
import pieces from "../constants/pieces";

class Piece {
  constructor(mockIndex = -1) {
    let index;
    if (mockIndex === -1)
      index = Math.floor(Math.random() * Math.floor(pieces.pieces.length));
    index = mockIndex;
    this.color = colors.colors[index];
    this.x = 3;
    this.y = -1;
    this.piece = pieces.pieces[index];
    this.index = index;
  }

  rotateLeft() {
    this.piece.push(this.piece.shift());
  }

  rotateRight() {
    let lastPos = this.piece.splice(-1, 1);
    this.piece.unshift(lastPos[0]);
  }
}

export default Piece;
