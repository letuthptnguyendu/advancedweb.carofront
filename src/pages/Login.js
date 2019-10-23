import React from 'react';
import { withRouter } from 'react-router-dom';

import { Container, Button, Avatar, TextField, Grid, Typography } from '@material-ui/core';
// import PropTypes from 'prop-types';

function LoginComp({ login, history }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [error, setError] = React.useState('');
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isCheckOn, setIsCheckOn] = React.useState(false);

  return (
    <Container maxWidth="xs">
      <Grid spacing={2} container>
        <Grid item xs={12} container justify="center">
          <Avatar
            style={{ width: 80, height: 80 }}
            src="https://tinyjpg.com/images/social/website.jpg"
          />
        </Grid>

        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="h5">Đăng nhập</Typography>
          {/* {error && (
            <Typography style={{ color: 'red' }} variant="body1">
              {error.message.toString()}
            </Typography>
          )} */}
        </Grid>
        <Grid item xs={12}>
          <form>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Tên tài khoản"
                  autoFocus
                  // error={!username && isCheckOn}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={password}
                  label="Mật khẩu"
                  type="password"
                  // error={!password && isCheckOn}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  // disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    login(username, password);
                    history.push('/');
                  }}
                >
                  Đăng nhập
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

// LoginComp.propTypes = {
//   login: PropTypes.func.isRequired,
// };

export default withRouter(LoginComp);
