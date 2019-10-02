import { BOARD_SIZE } from "../config/index";

export default function calculateWinner(squares) {
  for (let square = 0; square < BOARD_SIZE * BOARD_SIZE; square += 1) {
    let rowSum = 0;
    let colSum = 0;
    let leftSum = 0;
    let rightSum = 0;

    if (squares[square]) {
      // check row
      for (let i = -2; i < 3; i += 1) {
        const currentValue = squares[square + i];

        if (currentValue) {
          if (currentValue === "X") rowSum += 1;
          else if (currentValue === "O") rowSum -= 1;
        }
      }
      if (rowSum === 5)
        return {
          winner: "X",
          winSquares: [square - 2, square - 1, square, square + 1, square + 2]
        };
      if (rowSum === -5)
        return {
          winner: "O",
          winSquares: [square - 2, square - 1, square, square + 1, square + 2]
        };

      // check column
      for (let i = -2; i < 3; i += 1) {
        const currentValue = squares[square + BOARD_SIZE * i];

        if (currentValue) {
          if (currentValue === "X") colSum += 1;
          else if (currentValue === "O") colSum -= 1;
        }
      }
      if (colSum === 5)
        return {
          winner: "X",
          winSquares: [
            square + BOARD_SIZE * -2,
            square + BOARD_SIZE * -1,
            square,
            square + BOARD_SIZE * 1,
            square + BOARD_SIZE * 2
          ]
        };
      if (colSum === -5)
        return {
          winner: "O",
          winSquares: [
            square + BOARD_SIZE * -2,
            square + BOARD_SIZE * -1,
            square,
            square + BOARD_SIZE * 1,
            square + BOARD_SIZE * 2
          ]
        };

      // check \\
      for (let i = -2; i < 3; i += 1) {
        const currentValue = squares[square + i + BOARD_SIZE * i];

        if (currentValue) {
          if (currentValue === "X") leftSum += 1;
          else if (currentValue === "O") leftSum -= 1;
        }
      }
      if (leftSum === 5)
        return {
          winner: "X",
          winSquares: [
            square - 2 + BOARD_SIZE * -2,
            square - 1 + BOARD_SIZE * -1,
            square,
            square + 1 + BOARD_SIZE * 1,
            square + 2 + BOARD_SIZE * 2
          ]
        };
      if (leftSum === -5)
        return {
          winner: "O",
          winSquares: [
            square - 2 + BOARD_SIZE * -2,
            square - 1 + BOARD_SIZE * -1,
            square,
            square + 1 + BOARD_SIZE * 1,
            square + 2 + BOARD_SIZE * 2
          ]
        };

      // check //
      for (let i = -2; i < 3; i += 1) {
        const currentValue = squares[square - i + BOARD_SIZE * i];

        if (currentValue) {
          if (currentValue === "X") rightSum += 1;
          else if (currentValue === "O") rightSum -= 1;
        }
      }
      if (rightSum === 5)
        return {
          winner: "X",
          winSquares: [
            square + 2 + BOARD_SIZE * -2,
            square + 1 + BOARD_SIZE * -1,
            square,
            square - 1 + BOARD_SIZE * 1,
            square - 2 + BOARD_SIZE * 2
          ]
        };
      if (rightSum === -5)
        return {
          winner: "O",
          winSquares: [
            square + 2 + BOARD_SIZE * -2,
            square + 1 + BOARD_SIZE * -1,
            square,
            square - 1 + BOARD_SIZE * 1,
            square - 2 + BOARD_SIZE * 2
          ]
        };
    }
  }
  return "";
}
