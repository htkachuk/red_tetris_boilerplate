class Piece {
  constructor(shapes, color) {
    this.shapes = shapes;
    this.color = color;
  }
  shape() {
    return this.shapes[0];
  }
  rotateLeft() {
    this.shapes.push(this.shapes.shift());
  }
  width() {
    return this.shapes[0].indexOf("|");
  }
  height() {
    return this.shapes[0].split("|").length;
  }
  getCell(x, y) {
    const currentPiece = this.shapes[0];

    if (
      x < 0 ||
      y < 0 ||
      x >= currentPiece.width() ||
      y >= currentPiece.height()
    ) {
      return false;
    }

    const pos = currentPiece.split("|")[y].substr(x, 1);

    if (pos === "1") {
      return true;
    } else {
      return false;
    }
  }
}

export default Piece;
