import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { POST } from '../utils/api';
import { TextInput, Button, Avatar } from '../components/common';

function Register({ history }) {
  const [avatarFile, setAvatarFile] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
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

    POST('/user/register', {
      username,
      password,
      fullname,
      email,
    })
      .then(res => {
        console.log('suc registry: ', res);

        history.push('/login');
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err registry: ', err);

        setError(err.message);
        setIsLoading(false);
      });
  }
  return (
    <Container maxWidth="xs" style={{ marginTop: 32 }}>
      <Grid spacing={2} container>
        <Grid item xs={12} container justify="center">
          <Avatar file={avatarFile} handleChangeFile={e => setAvatarFile(e.target.files[0])} />
        </Grid>

        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="h5">Đăng ký 1 tài khoản mới</Typography>
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
                  label="Tên người dùng"
                  error={!fullname && isCheckOn}
                  value={fullname}
                  onChange={e => setFullname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required={false}
                  label="Email"
                  error={!email && isCheckOn}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  value={password}
                  label="Mật khẩu"
                  type="password"
                  error={!password && isCheckOn}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
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
