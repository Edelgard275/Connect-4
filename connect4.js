/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//1. per directions: height, width & currPlayer will move from global variables to instance attributes on the created class Game. Make a constructor with default values for these. 
//What else should move? both players?
class Game {
  constructor(p1, p2, height = 6, width = 7) {
    this.players = [p1, p2];
    this.width = width;
    this.height = height;
    this.currPlayer = p1; //start with p1 as active player. converted starter code from "1" num to variable p1 to represent player.
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
  }
    //initialize this.board in makeBoard method as an empty array of objects to iterate and push onto
  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
      }
  }
  makeHtmlBoard() {
    const board = document.getElementById('board');
    //initialize board's inner HTML as an empty string
    board.innerHTML = '';
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    //create a hanleClick bound function as a reference
    this.handleGameClick = this.handleClick.bind(this);
    top.addEventListener('click', this.handleGameClick);
  
    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
      }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement('tr');
  
          for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
          }
      board.append(row);
    }
  }
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  
  /** placeInTable: update DOM to place piece into HTML table of board */
  
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    //can change from add a class to referencing the already made currPlayer 
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  
  /** endGame: announce game end */
  //remove event listener with previous this.handleGameClick reference made earlier
  endGame(msg) {
    alert(msg);
    const top = document.querySelector("#column-top");
    top.removeEventListener("click", this.handleGameClick);
  }
  
  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    // create x from ID of clicked cell
    const x = +evt.target.id;
  
    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // check for win
    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`The ${this.currPlayer.color} player won!`);
    }
    
    // switch players
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0]
  
  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  
  checkForWin() 
     // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
    const _win = cells => 
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
  
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}
class Player {
  constructor(color) {
    this.color = color;
  }
 }

 document.getElementById('start-game').addEventListener('click', () => {
  let p1 = new Player(document.getElementById('p1-color').value);
  let p2 = new Player(document.getElementById('p2-color').value);
  new Game(p1, p2);
 })
/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
//2. move the current functions onto the class as methods
// function makeBoard() {
//   for (let y = 0; y < HEIGHT; y++) {
//     boa/rd.push(Array.from({ length: WIDTH }));
//   }
// }

/** makeHtmlBoard: make HTML table and row of column tops. */

// function makeHtmlBoard() {
//   const board = document.getElementById('board');

//   // make column tops (clickable area for adding a piece to that column)
//   const top = document.createElement('tr');
//   top.setAttribute('id', 'column-top');
//   top.addEventListener('click', handleClick);

//   for (let x = 0; x < WIDTH; x++) {
//     const headCell = document.createElement('td');
//     headCell.setAttribute('id', x);
//     top.append(headCell);
//   }

//   board.append(top);

//   // make main part of board
//   for (let y = 0; y < HEIGHT; y++) {
//     const row = document.createElement('tr');

//     for (let x = 0; x < WIDTH; x++) {
//       const cell = document.createElement('td');
//       cell.setAttribute('id', `${y}-${x}`);
//       row.append(cell);
//     }

//     board.append(row);
//   }
// }

/** findSpotForCol: given column x, return top empty y (null if filled) */

// function findSpotForCol(x) {
//   for (let y = HEIGHT - 1; y >= 0; y--) {
//     if (!board[y][x]) {
//       return y;
//     }
//   }
//   return null;
// }

// /** placeInTable: update DOM to place piece into HTML table of board */

// function placeInTable(y, x) {
//   const piece = document.createElement('div');
//   piece.classList.add('piece');
//   piece.classList.add(`p${currPlayer}`);
//   piece.style.top = -50 * (y + 2);

//   const spot = document.getElementById(`${y}-${x}`);
//   spot.append(piece);
// }

// /** endGame: announce game end */

// function endGame(msg) {
//   alert(msg);
// }

// /** handleClick: handle click of column top to play piece */

// function handleClick(evt) {
//   // get x from ID of clicked cell
//   const x = +evt.target.id;

//   // get next spot in column (if none, ignore click)
//   const y = findSpotForCol(x);
//   if (y === null) {
//     return;
//   }

//   // place piece in board and add to HTML table
//   board[y][x] = currPlayer;
//   placeInTable(y, x);
  
//   // check for win
//   if (checkForWin()) {
//     return endGame(`Player ${currPlayer} won!`);
//   }
  
//   // check for tie
//   if (board.every(row => row.every(cell => cell))) {
//     return endGame('Tie!');
//   }
    
//   // switch players
//   currPlayer = currPlayer === 1 ? 2 : 1;
// }

// /** checkForWin: check board cell-by-cell for "does a win start here?" */

// function checkForWin() {
//   function _win(cells) {
//     // Check four cells to see if they're all color of current player
//     //  - cells: list of four (y, x) cells
//     //  - returns true if all are legal coordinates & all match currPlayer

//     return cells.every(
//       ([y, x]) =>
//         y >= 0 &&
//         y < HEIGHT &&
//         x >= 0 &&
//         x < WIDTH &&
//         board[y][x] === currPlayer
//     );
//   }

//   for (let y = 0; y < HEIGHT; y++) {
//     for (let x = 0; x < WIDTH; x++) {
//       // get "check list" of 4 cells (starting here) for each of the different
//       // ways to win
//       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
//       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
//       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

//       // find winner (only checking each win-possibility as needed)
//       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//         return true;
//       }
//     }
//   }
// }

