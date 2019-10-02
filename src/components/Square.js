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

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  isWin: PropTypes.number,
};

export default Square;
