import React from 'react';
import { Container, Button, Avatar, TextField, Grid, Typography } from '@material-ui/core';
import axios from 'axios';

import { SERVER_URL } from '../config';

function Register() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatedPassword, setRepeatPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckOn, setIsCheckOn] = React.useState(false);

  function register() {
    if (!username || !password || !repeatedPassword) {
      setIsCheckOn(true);
      return;
    }

    if (password !== repeatedPassword) {
      setError({ message: 'Password không khớp nhau' });
      return;
    }

    setError('');
    setIsLoading(true);

    axios
      .post(`${SERVER_URL}/user/register`, {
        username,
        password,
      })
      .then(res => {
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }
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
          {error && (
            <Typography style={{ color: 'red' }} variant="body1">
              {error.message.toString()}
            </Typography>
          )}
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
                  error={!username && isCheckOn}
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
                  error={!password && isCheckOn}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={repeatedPassword}
                  label="Mật khẩu"
                  type="password"
                  error={!repeatedPassword && isCheckOn}
                  onChange={e => setRepeatPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    register();
                  }}
                >
                  Đăng ký
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
