export const JOIN_ROOM = 'JOIN_ROOM'

export const joinRoom = (name) => {
  return {
    type: JOIN_ROOM,
    name,
  }
}

