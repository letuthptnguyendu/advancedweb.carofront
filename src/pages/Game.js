import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { CLEAR_SORT_TYPE, TOGGLE_SORT_TYPE, JUMP_TO, UPDATE_BOARD } from '../actions';

import { BOARD_SIZE } from '../config';
import calculateWinner from '../utils/game';
import Board from '../components/Board';
import { HeaderLayout } from '../components/layout';

class Game extends React.Component {
  // changeSortType = () => {
  //   const { onChangeSortType } = this.props;

  //   onChangeSortType();
  // };

  // clearSortType = () => {
  //   const { onClearSortType } = this.props;

  //   onClearSortType();
  // };

  handleClick(i) {
    const { onUpdateBoard, history, stepNumber, xIsNext } = this.props;

    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const newSquares = current.squares.slice();

    if (current.winner || newSquares[i]) return;

    newSquares[i] = xIsNext ? 'X' : 'O';

    // if have a winner or the square have value already
    const tempWinner = calculateWinner(newSquares);

    // newSquares[Math.floor(Math.random() * 400)] = 'O';

    onUpdateBoard(i, newSquares, newHistory, tempWinner);
  }

  jumpTo(step) {
    const { onJumpTo } = this.props;

    onJumpTo(step);
  }

  render() {
    const { history, stepNumber, xIsNext } = this.props;
    const current = history[stepNumber];

    const moves = history.map((step, move) => {
      const text = move
        ? `  Go to move #${move} - ${step.position % BOARD_SIZE}: ${Math.floor(
            step.position / BOARD_SIZE,
          )}`
        : 'Go to game start';

      return (
        <button
          key={move.toString()}
          style={{
            minWidth: '100%',
            color: 'white',
            backgroundColor: '#3f51b5',
            padding: '0.5rem',
            margin: '0.25rem 0',
            border: 0,
          }}
          type="button"
          onClick={() => this.jumpTo(move)}
        >
          {stepNumber === move ? <b>{text}</b> : text}
        </button>
      );
    });

    let status;
    if (current.winner) {
      status = (
        <div
          style={{
            color: 'white',
            textAlign: 'center',
            padding: '1rem',
            margin: '0 0 1rem',
            backgroundColor: 'green',
          }}
        >{`Winner:  + ${current.winner}`}</div>
      );
    } else {
      status = (
        <div
          style={{
            color: 'white',
            textAlign: 'center',
            padding: '1rem',
            margin: '0 0 1rem',
            backgroundColor: 'orange',
          }}
        >{`Next player:  + ${xIsNext ? 'X' : 'O'}`}</div>
      );
    }

    return (
      <HeaderLayout>
        <Container maxWidth="md">
          <Grid container spacing={2} style={{ marginTop: '1rem' }}>
            <Grid item xs={8}>
              <Board
                winSquares={current.winSquares}
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </Grid>
            <Grid item xs>
              {status}
              {/* <button className="game-sort-button" type="button" onClick={this.changeSortType}>
                {`Sort: ${sortType}`}
              </button> */}

              {/* <button className="game-sort-button" type="button" onClick={this.clearSortType}>
                Clear sorted method
              </button> */}
              {moves}
            </Grid>
          </Grid>
        </Container>
      </HeaderLayout>
    );
  }
}

Game.propTypes = {
  onUpdateBoard: PropTypes.func.isRequired,
  onJumpTo: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.array.isRequired,
  xIsNext: PropTypes.bool.isRequired,
  stepNumber: PropTypes.number.isRequired,
  // sortType: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return { ...state.gameReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    // onChangeSortType: () => {
    //   dispatch({ type: TOGGLE_SORT_TYPE });
    // },
    // onClearSortType: () => {
    //   dispatch({ type: CLEAR_SORT_TYPE });
    // },
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
