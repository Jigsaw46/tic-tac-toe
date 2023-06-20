var board = ["", "", "", "", "", "", "", "", ""];

var player = "X";
var computer = "O";
var turn = player;

var cells = document.querySelectorAll("td");
var resetButton = document.querySelector("#reset");

cells.forEach(function(cell) {
 cell.addEventListener("click", function(event) {
  if (board[cell.dataset.index] === "") {
   cell.textContent = turn;
   board[cell.dataset.index] = turn;
   checkWinner();
   turn = (turn === player) ? computer : player;
   if (turn === computer) {
    computerTurn();
   }
  }
 });
});

resetButton.addEventListener("click", function(event) {
 resetGame();
});

function checkWinner() {
 var winner = null;
 if ((board[0] === turn && board[1] === turn && board[2] === turn) ||
  (board[3] === turn && board[4] === turn && board[5] === turn) ||
  (board[6] === turn && board[7] === turn && board[8] === turn) ||
  (board[0] === turn && board[3] === turn && board[6] === turn) ||
  (board[1] === turn && board[4] === turn && board[7] === turn) ||
  (board[2] === turn && board[5] === turn && board[8] === turn) ||
  (board[0] === turn && board[4] === turn && board[8] === turn) ||
  (board[2] === turn && board[4] === turn && board[6] === turn)) {
  winner = turn;
 }
 if (winner !== null) {
  alert(winner + " wins!");
  resetGame();
 } else if (board.every(function(cell) { return cell !== "" })) {
  alert("Tie game!");
  resetGame();
 }
}

function resetGame() {
 board = ["", "", "", "", "", "", "", "", ""];
 turn = player;
 cells.forEach(function(cell) {
  cell.textContent = "";
 });
}

function computerTurn() {
 setTimeout(function() {
  var emptyCells = board.reduce(function(array, cell, index) {
   if (cell === "") {
    array.push(index);
   }
   return array;
  }, []);
  var randomIndex = Math.floor(Math.random() * emptyCells.length);
  var choice = emptyCells[randomIndex];
  cells[choice].click();
 }, 1000);
}