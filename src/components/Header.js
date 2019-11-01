import React from 'react';
import { Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function Header({ history, userInfo }) {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {userInfo ? (
          <>
            <Typography variant="button">{userInfo.fullname}</Typography>
            <Button style={{ marginLeft: '1rem' }} color="inherit">
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => history.push('/login')}>
              Đăng nhập
            </Button>
            <Button color="inherit" onClick={() => history.push('/register')}>
              Đăng ký
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => {
  return { userInfo: state.authReducer.userInfo };
};

export default connect(mapStateToProps)(withRouter(Header));
