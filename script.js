const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setCell = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board.fill("");
    console.log("Board reset", board);
  };

  return { getBoard, setCell, resetBoard };
})();

const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const status = document.querySelector(".status");
  const restartButton = document.querySelector(".new-game");

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      gameController.handleCellClick(e.target.dataset.index);
    });
  });

  restartButton.addEventListener("click", () => {
    gameController.resetGame();
    console.log("reset button pressed");
  });

  const updateCells = () => {
    const board = gameBoard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const setStatus = (message) => {
    status.textContent = message;
  };

  return { updateCells, setStatus };
})();

const player = (name, mark) => {
  const getMark = () => mark;
  const getName = () => name;
  return { getName, getMark };
};

const gameController = (() => {
  const playerX = player(prompt("Enter player 1 name"), "X");
  const playerO = player(prompt("Enter player 2 name"), "O");
  let currentPlayer = playerX;
  let gameOver = false;

  const handleCellClick = (index) => {
    if (gameOver || !gameBoard.setCell(index, currentPlayer.getMark())) {
      return;
    }

    displayController.updateCells();

    if (checkWin()) {
      displayController.setStatus(`${currentPlayer.getName()} wins!`);
      gameOver = true;
    } else if (checkDraw()) {
      displayController.setStatus("Its a draw!");
      gameOver = true;
    } else {
      switchPlayer();
      displayController.setStatus(`${currentPlayer.getName()}'s turn`);
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const checkWin = () => {
    const board = gameBoard.getBoard();
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winPatterns.some((pattern) =>
      pattern.every((index) => board[index] === currentPlayer.getMark())
    );
  };

  const checkDraw = () => {
    return gameBoard.getBoard().every((cell) => cell != "");
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    console.log("passed reset board");
    displayController.updateCells();
    gameOver = false;
    currentPlayer = playerX;
    displayController.setStatus(`${currentPlayer.getName()}'s turn`);
  };

  return { handleCellClick, resetGame };
})();

document.addEventListener("DOMContentLoaded", () => {
  gameController.resetGame();
});
