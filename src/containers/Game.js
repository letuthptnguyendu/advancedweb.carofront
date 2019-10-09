import { connect } from 'react-redux';
import GameComp from '../Game';
import { CLEAR_SORT_TYPE, TOGGLE_SORT_TYPE, JUMP_TO, UPDATE_BOARD } from '../actions';

const mapStateToProps = state => {
  return { ...state.gameReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeSortType: () => {
      dispatch({ type: TOGGLE_SORT_TYPE });
    },
    onClearSortType: () => {
      dispatch({ type: CLEAR_SORT_TYPE });
    },
    onJumpTo: step => {
      dispatch({ type: JUMP_TO, step });
    },
    onUpdateBoard: (index, newSquares, newHistory, tempWinner) => {
      dispatch({ type: UPDATE_BOARD, index, newSquares, newHistory, tempWinner });
    },
  };
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComp);

export default Game;
