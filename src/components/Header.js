import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

function Header({ history, username }) {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {username ? (
          <>
            <Typography variant="h6">{username}</Typography>
            <Button color="inherit">Sign out</Button>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
