import React from "react";
import "./Game.css";
import calculateWinner from "./utils/index";
import Board from "./components/Board";
import { BOARD_SIZE } from "./config/index";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          winner: "",
          order: "",
          position: "",
          winSquares: "",
          squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null)
        }
      ],
      stepNumber: 0,
      sortType: "", // '': move, 'desc': descreasing, 'asc': ascending
      xIsNext: true
    };
  }

  changeSortType = () => {
    const { sortType } = this.state;
    this.setState({
      sortType: sortType === "asc" ? "desc" : "asc"
    });
  };

  clearSortType = () => {
    this.setState({ sortType: "" });
  };

  handleClick(i) {
    const { history, xIsNext, stepNumber } = this.state;

    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const newSquares = current.squares.slice();

    if (current.winner || newSquares[i]) return;

    newSquares[i] = xIsNext ? "X" : "O";

    // if have a winner or the square have value already
    const tempWinner = calculateWinner(newSquares);

    this.setState({
      history: newHistory.concat([
        {
          winner: tempWinner && tempWinner.winner,
          winSquares: tempWinner && tempWinner.winSquares,
          order: newHistory.length,
          position: i,
          squares: newSquares
        }
      ]),
      stepNumber: newHistory.length,
      xIsNext: !xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const { history, stepNumber, sortType, xIsNext } = this.state;
    const current = history[stepNumber];
    const moves = history
      .sort((a, b) => {
        if (a.position && b.position) {
          if (sortType === "asc") return a.position - b.position;
          if (sortType === "desc") return b.position - a.position;
          return a.order - b.order;
        }
        return 0;
      })
      .map((step, move) => {
        const text = move
          ? `${step.position % BOARD_SIZE}: ${Math.floor(
              step.position / BOARD_SIZE
            )} ======= Go to move # + ${move}`
          : "Go to game start";
        return (
          <li key={move.toString()}>
            <button type="button" onClick={() => this.jumpTo(move)}>
              {stepNumber === move ? <b>{text}</b> : text}
            </button>
          </li>
        );
      });

    let status;
    if (current.winner) {
      status = `Winner:  + ${current.winner}`;
    } else {
      status = `Next player:  + ${xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winSquares={current.winSquares}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button
            className="game-sort-button"
            type="button"
            onClick={this.changeSortType}
          >
            {`Sort: ${sortType}`}
          </button>
          <button
            className="game-sort-button"
            type="button"
            onClick={this.clearSortType}
          >
            Clear sorted method
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
