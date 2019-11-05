import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, withStyles, Button, Grid } from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import { withCookies } from 'react-cookie';

import { UNDO, UPDATE_BOARD, updateBoard } from '../actions';

import { BOARD_SIZE } from '../config';
import calculateWinner from '../utils/game';
import Board from '../components/Board';
import { HeaderLayout } from '../components/layout';
import { GET } from '../utils/api';
import { SOCKET_URL } from '../config/server';

class GamePvP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIOClient(SOCKET_URL),
    };
  }

  componentDidMount() {
    this.state.socket.on('check-res', data => {
      const { game_id, position } = data;
      if (game_id === this.props.match.params.gid) {
        const { onUpdateBoardOff, history, stepNumber } = this.props;
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const newSquares = current.squares.slice();

        newSquares[position] = history.length % 2 === 0 ? 'X' : 'O';
        const tempWinner = calculateWinner(newSquares);

        onUpdateBoardOff(position, newSquares, newHistory, tempWinner);
      }
    });

    this.state.socket.on('undo', ({ game_id }) => {
      if (game_id === this.props.match.params.gid) {
        if (window.confirm('Cho phép đối thủ đi lại?')) {
          this.state.socket.emit('undo-status', {
            game_id: this.props.match.params.gid,
            is_ok: true,
          });
        } else {
          this.state.socket.emit('undo-status', {
            game_id: this.props.match.params.gid,
            is_ok: false,
          });
        }
      }
    });

    this.state.socket.on('undo-status', ({ game_id, is_ok }) => {
      if (game_id === this.props.match.params.gid) {
        if (is_ok) {
          this.props.undo();
        } else {
          alert('Không chấp nhận');
        }
      }
    });

    GET(`/game/${this.props.match.params.gid}`, this.props.cookies.get('token'))
      .then(res => {
        res.data.history.forEach(position => {
          const { history, stepNumber } = this.props;
          const newHistory = history.slice(0, stepNumber + 1);
          const current = newHistory[newHistory.length - 1];
          const newSquares = current.squares.slice();
          if (current.winner || newSquares[position]) return;
          newSquares[position] = (history.length % 2) - 1 === 0 ? 'X' : 'O';

          // if have a winner or the square have value already
          const tempWinner = calculateWinner(newSquares);
          this.props.onUpdateBoardOff(position, newSquares, newHistory, tempWinner);
        });
      })
      .catch(err => console.log('err get new game', err));
  }

  onUndo = () => {
    this.state.socket.emit('undo', {
      user_id: this.props.cookies.get('user_id'),
      game_id: this.props.match.params.gid,
    });
  };

  handleClick(i) {
    const { history, stepNumber } = this.props;
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const newSquares = current.squares.slice();
    if (current.winner || newSquares[i]) return;

    this.state.socket.emit('check', {
      user_id: this.props.cookies.get('user_id'),
      game_id: this.props.match.params.gid,
      position: i,
    });
  }

  render() {
    const { classes, history, stepNumber } = this.props;
    console.log(history, stepNumber);
    const current = history[stepNumber];

    const xIsNext = history && (history.length % 2) - 1 === 0;
    const moves = history.map((step, move) => {
      const text = move
        ? `#${move} - ${step.position % BOARD_SIZE}: ${Math.floor(step.position / BOARD_SIZE)}`
        : 'Bắt đầu';

      return (
        <div
          key={move.toString()}
          style={{
            color: 'white',
            backgroundColor: '#3f51b5',
            padding: '0.5rem',
            margin: '0.25rem 0',
            border: 0,
          }}
        >
          {stepNumber === move ? <b>{text}</b> : text}
        </div>
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
        >{`Tiếp theo:  + ${xIsNext ? 'O' : 'X'}`}</div>
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

              <div style={{ margin: '1rem 0 0 0' }}>
                <Button
                  onClick={this.onUndo}
                  fullWidth
                  color="primary"
                  style={{ borderRadius: 0 }}
                  variant="contained"
                >
                  Xin đi lại
                </Button>

                <div style={{ margin: '1rem 0', display: 'flex' }}>
                  <Button
                    classes={{ root: classes.backgroundYellow }}
                    style={{ flex: 1, borderRadius: 0 }}
                    variant="contained"
                  >
                    Xin hòa
                  </Button>
                  <div style={{ width: '1rem' }}></div>
                  <Button
                    style={{ flex: 1, borderRadius: 0 }}
                    variant="contained"
                    color="secondary"
                  >
                    Nhận thua
                  </Button>
                </div>
              </div>

              {moves}
            </Grid>
          </Grid>
        </Container>
      </HeaderLayout>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.gameReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    undo: () => {
      dispatch({ type: UNDO });
    },
    onUpdateBoard: (gid, { position, newSquares, newHistory, tempWinner }, token) => {
      dispatch(updateBoard(gid, { position, newSquares, newHistory, tempWinner }, token));
    },
    onUpdateBoardOff: (position, newSquares, newHistory, tempWinner) => {
      dispatch({ type: UPDATE_BOARD, position, newSquares, newHistory, tempWinner });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withCookies(
    withStyles({
      backgroundYellow: {
        backgroundColor: 'green',
        color: 'white',
      },
    })(GamePvP),
  ),
);
