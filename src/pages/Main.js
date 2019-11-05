import React from 'react';
import { withCookies } from 'react-cookie';
import socketIOClient from 'socket.io-client';
import { Dialog, DialogContentText, DialogContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { UPDATE_BOARD } from '../actions';
import { GET } from '../utils/api';
import { HeaderLayout } from '../components/layout';
import { Button } from '../components/common';
import { SOCKET_URL } from '../config/server';
import { BOARD_SIZE } from '../config/const';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: false,
      socket: socketIOClient(SOCKET_URL),
    };
  }

  resetGameStore = () => {
    this.props.onUpdateBoardOff('', Array(BOARD_SIZE * BOARD_SIZE).fill(null), [], '');
  };

  onPvc = () => {
    GET('/game/new', this.props.cookies.get('token'))
      .then(res => {
        this.resetGameStore();
        this.props.history.push(`/game/${res.data._id}`);
      })
      .catch(err => console.log('err get new game', err));
  };

  onPvp = () => {
    this.state.socket.emit('pending', this.props.cookies.get('user_id'));
    this.setState({ isPending: true });

    const userId = this.props.cookies.get('user_id');

    this.state.socket.on('join-game', data => {
      if (data.user_id === userId || data.user2_id === userId) {
        this.state.socket.disconnect();
        this.resetGameStore();
        this.props.history.push(`/game-pvp/${data._id}`);
      }
    });
  };

  handleClose = () => {};

  render() {
    return (
      <HeaderLayout>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(60vh)',
          }}
        >
          <Button
            onClick={this.onPvc}
            variant="outlined"
            style={{ height: '6rem', maxWidth: '200px' }}
          >
            Chơi với máy
          </Button>
          <div style={{ width: '2rem' }}></div>
          <Button
            onClick={this.onPvp}
            variant="outlined"
            style={{ height: '6rem', maxWidth: '200px' }}
          >
            Chơi online
          </Button>
        </div>

        {
          <Dialog open={this.state.isPending} onClose={this.handleClose}>
            <DialogContent>
              <DialogContentText>Đang tìm đối thủ...</DialogContentText>
            </DialogContent>
          </Dialog>
        }
      </HeaderLayout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateBoardOff: (position, newSquares, newHistory, tempWinner) => {
      dispatch({
        type: UPDATE_BOARD,
        position,
        newSquares,
        newHistory,
        tempWinner,
        xIsNext: true,
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withCookies(withRouter(Main)));
