import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HeaderLayout } from '../components/layout';
import { Button } from '../components/common';

class Main extends React.Component {
  render() {
    const { history } = this.props;
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
            onClick={() => history.push('/game/32')}
            variant="outlined"
            style={{ height: '6rem', maxWidth: '200px' }}
          >
            Chơi với máy
          </Button>
          <div style={{ width: '2rem' }}></div>
          <Button variant="outlined" style={{ height: '6rem', maxWidth: '200px' }}>
            Chơi online
          </Button>
        </div>
      </HeaderLayout>
    );
  }
}

export default withRouter(Main);
