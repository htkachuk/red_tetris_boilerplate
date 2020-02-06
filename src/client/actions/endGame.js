import { END_GAME } from "./eventTypes";

export const endGame = () => {
  return {
    type: END_GAME
  };
};
