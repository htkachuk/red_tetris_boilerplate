import colors from "../constants/colors";
import pieces from "../constants/pieces";

class Piece {
  rotateLeft(piece) {
    return piece.push(piece.shift());
  }

  rotateRight(piece) {
    let oldPiece = piece;
    return piece.unshift(oldPiece.splice(2, 1));
  }

  getRandomPiece() {
    const index = Math.floor(Math.random() * Math.floor(pieces.length));

    const Piece = {
      color: colors[index],
      x: 3,
      y: -1,
      piece: pieces[index],
      index
    };
    return Piece;
  }
}

export default Piece;
