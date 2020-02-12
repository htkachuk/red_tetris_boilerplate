class Piece {
  rotateLeft(piece) {
    return piece.push(piece.shift());
  }

  rotateRight(piece) {
    let oldPiece = piece;
    return piece.unshift(oldPiece.splice(2, 1));
  }
}

export default Piece;
