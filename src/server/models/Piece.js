import colors from "../constants/colors";
import pieces from "../constants/pieces";

class Piece {
  constructor() {
    const index = Math.floor(Math.random() * Math.floor(pieces.length));
    this.color = colors[index];
    this.x = 3;
    this.y = -1;
    this.piece = pieces[index];
    this.index = index;
  }

  rotateLeft() {
    return this.piece.push(this.piece.shift());
  }

  rotateRight() {
    let oldPiece = this.piece;
    return this.piece.unshift(oldPiece.splice(2, 1));
  }

  // getRandomPiece() {
  //   const index = Math.floor(Math.random() * Math.floor(pieces.length));

  //   const Piece = {
  //     color: colors[index],
  //     x: 3,
  //     y: -1,
  //     piece: pieces[index],
  //     index
  //   };
  //   return Piece;
  // }
}

export default Piece;
