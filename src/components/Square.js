import React from 'react';
// import PropTypes from 'prop-types';

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

export default Square;
