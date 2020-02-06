import { MOVE_UNIT } from "./eventTypes";

export const moveUnit = move => {
  return {
    type: MOVE_UNIT,
    move
  };
};
