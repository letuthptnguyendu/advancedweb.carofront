import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { withCookies } from 'react-cookie';

import { JUMP_TO, UPDATE_BOARD, updateBoard, jumpTo } from '../actions';

import { BOARD_SIZE } from '../config';
import calculateWinner from '../utils/game';
import Board from '../components/Board';
import { HeaderLayout } from '../components/layout';
import { GET } from '../utils/api';

class Game extends React.Component {
  componentDidMount() {
    this.props.onUpdateBoardOff('', Array(BOARD_SIZE * BOARD_SIZE).fill(null), [], '');

    GET(`/game/${this.props.match.params.gid}`, this.props.cookies.get('token'))
      .then(res => {
        res.data.history.map((position, index) => {
          const { history, stepNumber, xIsNext } = this.props;

          const newHistory = history.slice(0, stepNumber + 1);
          const current = newHistory[newHistory.length - 1];
          const newSquares = current.squares.slice();

          if (current.winner || newSquares[position]) return;

          newSquares[position] = history.length % 2 === 1 ? 'X' : 'O';

          // if have a winner or the square have value already
          const tempWinner = calculateWinner(newSquares);

          this.props.onUpdateBoardOff(position, newSquares, newHistory, tempWinner);
        });
      })
      .catch(err => console.log('err get new game', err));
  }

  handleClick(i) {
    const { onUpdateBoard, history, stepNumber, xIsNext } = this.props;

    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const newSquares = current.squares.slice();

    if (current.winner) return;

    if (i === 'random')
      while (i === 'random') {
        i = Math.floor(Math.random() * 400);
        if (current.winner || newSquares[i]) i = 'random';
      }

    if (newSquares[i]) return;

    newSquares[i] = xIsNext ? 'X' : 'O';

    // if have a winner or the square have value already
    const tempWinner = calculateWinner(newSquares);

    onUpdateBoard(
      this.props.match.params.gid,
      { position: i, newSquares, newHistory, tempWinner },
      this.props.cookies.get('token'),
    );
  }

  jumpTo(step) {
    const { onJumpTo } = this.props;

    onJumpTo(this.props.match.params.gid, step, this.props.cookies.get('token'));
  }

  render() {
    const { history, stepNumber, xIsNext } = this.props;
    const current = history[stepNumber];

    const moves = history.map((step, move) => {
      const text = move
        ? `  Quay về #${move} - ${step.position % BOARD_SIZE}: ${Math.floor(
            step.position / BOARD_SIZE,
          )}`
        : 'Bắt đầu';

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
        >{`Thắng:  + ${current.winner}`}</div>
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
        >{`Tiếp theo:  + ${xIsNext ? 'Bạn' : 'Máy'}`}</div>
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
                onClick={
                  xIsNext
                    ? i => {
                        this.handleClick(i);
                        setTimeout(() => this.handleClick('random'), 1000);
                      }
                    : () => {}
                }
              />
            </Grid>
            <Grid item xs>
              {status}

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
  xIsNext: PropTypes.bool.isRequired,
  stepNumber: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return { ...state.gameReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    onJumpTo: (gid, step, token) => {
      dispatch(jumpTo(gid, step, token));
    },
    onUpdateBoard: (gid, { position, newSquares, newHistory, tempWinner }, token) => {
      dispatch(updateBoard(gid, { position, newSquares, newHistory, tempWinner }, token));
    },
    onUpdateBoardOff: (position, newSquares, newHistory, tempWinner) => {
      dispatch({ type: UPDATE_BOARD, position, newSquares, newHistory, tempWinner, xIsNext: true });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(Game));
