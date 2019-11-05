import { JUMP_TO, UPDATE_BOARD } from '../actions';
import { BOARD_SIZE } from '../config';

// receive state and action to return new state
// in this receive state.todos

const initState = {
  history: [
    {
      winner: '',
      position: '',
      winSquares: '',
      squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};

// eslint-disable-next-line import/prefer-default-export
export const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case JUMP_TO:
      return { ...state, stepNumber: action.step, xIsNext: action.step % 2 === 0 };
    case UPDATE_BOARD:
      return {
        ...state,
        history: action.newHistory.concat([
          {
            winner: action.tempWinner && action.tempWinner.winner,
            winSquares: action.tempWinner && action.tempWinner.winSquares,
            position: action.position,
            squares: action.newSquares,
          },
        ]),
        stepNumber: action.newHistory.length,
        xIsNext: !state.xIsNext,
      };
    default:
      return state;
  }
};
