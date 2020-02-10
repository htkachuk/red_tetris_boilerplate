import { pieces } from "../constants/pieces";
import colors from "../constants/colors";
import Piece from "./Piece";

class Game {
  constructor(mode, players) {
    this.mode = mode;
    this.players = players;
    this.endGame = false;
    this.startGame = false;
    this.speed = 0;
  }

  getPiece() {
    const index = Math.floor(Math.random() * Math.floor(pieces.length));
    return Piece(pieces[index], colors[index]);
  }

  addSpeed() {
    this.speed += 10;
  }

  startGame() {
    this.startGame = true;
  }

  endGame() {
    this.endGame = true;
  }
}

export default Game;
