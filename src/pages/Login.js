import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Avatar, Typography, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { Facebook } from '@material-ui/icons';
import { withCookies } from 'react-cookie';

import { LOGIN } from '../actions';
import { POST } from '../utils/api';
import { TextInput, Button } from '../components/common';

function Login({ history, userLogin, cookies }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckOn, setIsCheckOn] = React.useState(false);

  const login = (un, pw) => {
    if (!un || !pw) {
      setIsCheckOn(true);
      return;
    }

    setError('');
    setIsLoading(true);

    POST('/user/login', { username: un, password: pw })
      .then(res => {
        console.log('suc login', res);

        userLogin(res.data.user);
        cookies.set('token', res.data.token);
        cookies.set('user_id', res.data.user._id);

        history.push('/');
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err login', err);

        setError(err.message);
        setIsLoading(false);
      });
  };

  const loginfb = () => {};

  return (
    <Container maxWidth="xs" style={{ marginTop: 32 }}>
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
            <Typography style={{ color: 'red' }} variant="caption">
              {error.toString()}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <form>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <TextInput
                  label="Tên tài khoản"
                  error={!username && isCheckOn}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  value={password}
                  label="Mật khẩu"
                  autoFocus={false}
                  type="password"
                  error={!password && isCheckOn}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={isLoading}
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    login(username, password);
                  }}
                >
                  Đăng nhập
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography
            style={{ color: 'gray', textAlign: 'center', marginTop: '2rem' }}
            variant="body1"
          >
            Hoặc
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={loginfb}>
              <Facebook />
            </IconButton>
            <div style={{ width: '2rem' }} />
            <IconButton>
              <Facebook />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
// };

const mapDispatchToProps = dispatch => {
  return {
    userLogin: payload => {
      dispatch({ type: LOGIN, payload });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(withCookies(Login)));
