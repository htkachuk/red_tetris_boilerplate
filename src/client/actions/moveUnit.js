export const MOVE_UNIT = "MOVE_UNIT";

export const moveUnit = move => {
  return {
    type: MOVE_UNIT,
    move
  };
};
