import React from 'react';
// import PropTypes from 'prop-types';
import { BOARD_SIZE } from '../config/index';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    const { squares, winSquares, onClick } = this.props;
    return <Square isWin={winSquares.includes(i)} value={squares[i]} onClick={() => onClick(i)} />;
  }

  render() {
    return (
      <div>
        {new Array(BOARD_SIZE).fill(0).map((optp, indexp) => {
          return (
            <div className="board-row" key={indexp.toString()}>
              {new Array(BOARD_SIZE).fill(0).map((optc, indexc) => (
                <React.Fragment key={indexc.toString()}>
                  {this.renderSquare(indexp * BOARD_SIZE + indexc)}
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;
