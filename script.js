const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('.status');
const restartButton = document.querySelector('.restart');

let currentPlayer = '';
let gameActive = false; // Game is not active until both players choose their marks
let gameState = ['', '', '', '', '', '', '', '', ''];

const winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const chooseXButton = document.querySelector('.choose-x');
const chooseOButton = document.querySelector('.choose-o');

chooseXButton.addEventListener('click', () => chooseMark('X'));
chooseOButton.addEventListener('click', () => chooseMark('O'));

function chooseMark(mark) {
  if (!gameActive) {
    currentPlayer = mark;
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(clickedCellIndex) {
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  cells[clickedCellIndex].textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winCombinations.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = '';
  gameActive = false;
  status.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}
