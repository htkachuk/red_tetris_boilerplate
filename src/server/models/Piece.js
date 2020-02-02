class Piece {
  constructor(shapes, color) {
    this.shape = shapes;
    this.color = color;
  }
  shape() {
    return this.shape[0];
  }
  rotateLeft() {
    this.shape.push(this.shape.shift());
  }

  // TODO:
  width() {}
  height() {}
  getCell() {}
}

export default Piece;
