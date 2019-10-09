import React from 'react';
import PropTypes from 'prop-types';

function Square({ onClick, value, isWin }) {
  return (
    <button
      style={{ backgroundColor: isWin ? 'red' : 'white' }}
      type="button"
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

Square.defaultProps = {
  value: '',
};

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  isWin: PropTypes.bool.isRequired,
};

export default Square;
