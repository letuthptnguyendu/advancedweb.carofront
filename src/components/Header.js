import React from 'react';
import { Container, Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

function Header({ history, userInfo }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          maxWidth="md"
        >
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
            <Typography variant="h6">Caro Game</Typography>
          </Link>

          {userInfo ? (
            <div>
              <Link style={{ color: 'white', textDecoration: 'none' }} replace to="/profile">
                <Typography variant="button">{userInfo.fullname}</Typography>
              </Link>

              <Button style={{ marginLeft: '1rem' }} color="inherit">
                Đăng xuất
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" onClick={() => history.push('/login')}>
                Đăng nhập
              </Button>
              <Button color="inherit" onClick={() => history.push('/register')}>
                Đăng ký
              </Button>
            </div>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => {
  return { userInfo: state.authReducer.userInfo };
};

export default connect(mapStateToProps)(withRouter(Header));
