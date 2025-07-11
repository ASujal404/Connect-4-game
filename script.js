const board = document.getElementById("board");
const message = document.getElementById("message");

const rows = 6;
const cols = 7;
let currentPlayer = "red";

let grid = Array(rows).fill().map(() => Array(cols).fill(null));

function createBoard() {
  board.innerHTML = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => handleClick(c));
      board.appendChild(cell);
    }
  }
}

function handleClick(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (!grid[row][col]) {
      grid[row][col] = currentPlayer;
      updateBoard();
      if (checkWin(row, col)) {
        message.textContent = `🎉 Player ${currentPlayer.toUpperCase()} Wins!`;
        disableBoard();
        return;
      }
      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      message.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
      return;
    }
  }
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    const r = +cell.dataset.row;
    const c = +cell.dataset.col;
    cell.classList.remove("red", "yellow");
    if (grid[r][c]) {
      cell.classList.add(grid[r][c]);
    }
  });
}

function checkWin(row, col) {
  return (
    checkDirection(row, col, -1, 0) + checkDirection(row, col, 1, 0) >= 3 || // vertical
    checkDirection(row, col, 0, -1) + checkDirection(row, col, 0, 1) >= 3 || // horizontal
    checkDirection(row, col, -1, -1) + checkDirection(row, col, 1, 1) >= 3 || // diagonal \
    checkDirection(row, col, -1, 1) + checkDirection(row, col, 1, -1) >= 3 // diagonal /
  );
}

function checkDirection(r, c, dr, dc) {
  let count = 0;
  let color = grid[r][c];
  for (let i = 1; i < 4; i++) {
    let nr = r + dr * i;
    let nc = c + dc * i;
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) break;
    if (grid[nr][nc] === color) count++;
    else break;
  }
  return count;
}

function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.style.pointerEvents = "none");
}

createBoard();

function restartGame() {
  grid = Array(rows).fill().map(() => Array(cols).fill(null));
  currentPlayer = "red";
  message.textContent = `Player RED's Turn`;
  createBoard();
}
