import { connect } from 'react-redux';
import { Header } from '../components';

const mapStateToProps = state => {
  return { ...state.authReducer };
};

export default connect(mapStateToProps)(Header);
