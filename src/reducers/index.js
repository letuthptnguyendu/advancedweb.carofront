import { CLEAR_SORT_TYPE, TOGGLE_SORT_TYPE, JUMP_TO, UPDATE_BOARD } from '../actions';
import { BOARD_SIZE } from '../config/index';

// receive state and action to return new state
// in this receive state.todos

const initState = {
  history: [
    {
      winner: '',
      order: '',
      position: '',
      winSquares: '',
      squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
    },
  ],
  stepNumber: 0,
  sortType: '', // '': move, 'desc': descreasing, 'asc': ascending
  xIsNext: true,
};

// eslint-disable-next-line import/prefer-default-export
export const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SORT_TYPE:
      return { ...state, sortType: state.sortType === 'asc' ? 'desc' : 'asc' };
    case CLEAR_SORT_TYPE:
      return { ...state, sortType: '' };
    case JUMP_TO:
      return { ...state, stepNumber: action.step, xIsNext: action.step % 2 === 0 };
    case UPDATE_BOARD:
      return {
        ...state,
        history: action.newHistory.concat([
          {
            winner: action.tempWinner && action.tempWinner.winner,
            winSquares: action.tempWinner && action.tempWinner.winSquares,
            order: action.newHistory.length,
            position: action.index,
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
