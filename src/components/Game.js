import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CLEAR_SORT_TYPE, TOGGLE_SORT_TYPE, JUMP_TO, UPDATE_BOARD } from '../actions';

import { BOARD_SIZE } from '../config';
import calculateWinner from '../utils/game';
import Board from './Board';
import { HeaderLayout } from './layout';

class Game extends React.Component {
  changeSortType = () => {
    const { onChangeSortType } = this.props;

    onChangeSortType();
  };

  clearSortType = () => {
    const { onClearSortType } = this.props;

    onClearSortType();
  };

  handleClick(i) {
    const { onUpdateBoard, history, isAINext, stepNumber } = this.props;

    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const newSquares = current.squares.slice();

    if (current.winner || newSquares[i]) return;

    newSquares[i] = 'N';

    // if have a winner or the square have value already
    const tempWinner = calculateWinner(newSquares);

    newSquares[Math.floor(Math.random() * 400)] = 'AI';

    onUpdateBoard(i, newSquares, newHistory, tempWinner);
  }

  jumpTo(step) {
    const { onJumpTo } = this.props;

    onJumpTo(step);
  }

  render() {
    const { history, stepNumber, sortType, isAINext } = this.props;
    const current = history[stepNumber];
    const moves = history
      .sort((a, b) => {
        if (a.position && b.position) {
          if (sortType === 'asc') return a.position - b.position;
          if (sortType === 'desc') return b.position - a.position;
          return a.order - b.order;
        }
        return 0;
      })
      .map((step, move) => {
        const text = move
          ? `${step.position % BOARD_SIZE}: ${Math.floor(
              step.position / BOARD_SIZE,
            )} ======= Go to move # + ${move}`
          : 'Go to game start';
        return (
          <li key={move.toString()}>
            <button type="button" onClick={() => this.jumpTo(move)}>
              {stepNumber === move ? <b>{text}</b> : text}
            </button>
          </li>
        );
      });

    let status;
    if (current.winner) {
      status = `Winner:  + ${current.winner}`;
    } else {
      status = `Next player:  + ${isAINext ? 'X' : 'O'}`;
    }

    return (
      <HeaderLayout>
        <div className="game">
          <div className="game-board">
            <Board
              winSquares={current.winSquares}
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button className="game-sort-button" type="button" onClick={this.changeSortType}>
              {`Sort: ${sortType}`}
            </button>
            <button className="game-sort-button" type="button" onClick={this.clearSortType}>
              Clear sorted method
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      </HeaderLayout>
    );
  }
}

Game.propTypes = {
  onChangeSortType: PropTypes.func.isRequired,
  onClearSortType: PropTypes.func.isRequired,
  onUpdateBoard: PropTypes.func.isRequired,
  onJumpTo: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.array.isRequired,
  isAINext: PropTypes.bool.isRequired,
  stepNumber: PropTypes.number.isRequired,
  sortType: PropTypes.string.isRequired,
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
