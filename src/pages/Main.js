import React from 'react';
import { withCookies } from 'react-cookie';
import socketIOClient from 'socket.io-client';
import { Dialog, DialogContentText, DialogContent } from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import { GET } from '../utils/api';
import { HeaderLayout } from '../components/layout';
import { Button } from '../components/common';
import { SOCKET_URL } from '../config/server';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: false,
      socket: socketIOClient(SOCKET_URL),
    };
  }

  componentDidMount() {}

  onPvc = () => {
    GET('/game/new', this.props.cookies.get('token'))
      .then(res => {
        this.props.history.push(`/game/${res.data._id}`);
      })
      .catch(err => console.log('err get new game', err));
  };

  onPvp = () => {
    this.state.socket.emit('pending', this.props.cookies.get('user_id'));
    this.setState({ isPending: true });

    const userId = this.props.cookies.get('user_id');

    this.state.socket.on('join-game', data => {
      console.log(data);
      if (data.user_id === userId || data.user2_id === userId) {
        console.log('datazoooooooooooooooo');
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

export default withCookies(withRouter(Main));
