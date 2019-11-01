import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Avatar, Typography, IconButton } from '@material-ui/core';
import { withCookies } from 'react-cookie';

import { HeaderLayout } from '../components/layout';
import { TextInput, Button } from '../components/common';
import { updateUser } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ fullname: nextProps.userInfo.fullname });
  }

  render() {
    const { userInfo, cookies, updateUser } = this.props;
    const { fullname } = this.state;
    const token = cookies.get('token');

    if (!userInfo) return null;
    return (
      <HeaderLayout>
        <Container maxWidth="xs" style={{ marginTop: 32 }}>
          <Grid spacing={2} container>
            <Grid item xs={12} container justify="center">
              <Avatar
                style={{ width: 80, height: 80 }}
                src="https://tinyjpg.com/images/social/website.jpg"
              />
            </Grid>

            <Grid item xs={12}>
              <form>
                <Grid spacing={2} container>
                  <Grid item xs={12}>
                    <TextInput
                      label="Tên người dùng"
                      value={fullname}
                      onChange={e => this.setState({ fullname: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      onClick={e => {
                        e.preventDefault();
                        updateUser({ fullname }, token);
                      }}
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      </HeaderLayout>
    );
  }
}

const mapStateToProps = state => {
  return { userInfo: state.authReducer.userInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (data, token) => {
      dispatch(updateUser(data, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(Profile));
