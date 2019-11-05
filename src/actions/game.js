import { POST } from '../utils/api';

export const JUMP_TO = 'JUMP_TO';
export const UPDATE_BOARD = 'UPDATE_BOARD';

export function updateBoard(gid, { position, newSquares, newHistory, tempWinner }, token) {
  return dispatch => {
    POST(`/game/${gid}`, { position }, token)
      .then(() => {
        dispatch({ type: UPDATE_BOARD, position, newSquares, newHistory, tempWinner });
      })
      .catch(err => console.log('errpr,', err.message));
  };
}
