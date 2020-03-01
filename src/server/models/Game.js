import { pieces } from "../constants/pieces";
import colors from "../constants/colors";
import Piece from "./Piece";
import { io } from "../index";

class Game {
  // constructor() {
  //   this.playersSocketId;
  //   this.playersBoard;
  // }

  async initGame(room) {
    for (let i = 3; i > 0; i--) {
      setTimeout(
        io.sockets.in(room.name).emit(eventTypes.INIT_GAME, {
          type: eventTypes.INIT_GAME,
          timeLeft: i
        }),
        1000
      );
    }
  }

  startGame() {}

  endGame() {}
}

export default Game;
