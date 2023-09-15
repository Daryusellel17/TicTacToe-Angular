import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {

  constructor() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    this.player = true;
    this.gameWon = false;
    this.returnCurrentPlayer();
    console.log("[i] Game board initiated.");
   }


  board: number[][]; // 0 = empty, 1 = X, -1 = O
  player: boolean; // true = X, false = O
  gameWon: boolean; // true = game won, false = game continues
  // Returns the current player represented by a string
  @Output() currentPlayer = new EventEmitter<string>();

  // - Changes the tunr of the player
  changePlayer() {
    this.player = !this.player;
    console.log("[i] Player changed to "+(this.player? "X" : "O")+".");
  }

  // - The player takes their turn
  place(row: number, col: number) {
    if(this.board[row][col] == 0) {
      this.board[row][col] = this.player? 1 : -1;
      this.changePlayer();
      console.log("[-] Player "+(!this.player? "X" : "O") + " has placed a piece at ("+row+", "+col+").");
      this.returnCurrentPlayer();
    }
  }

  // - Resets the game board
  resetGame() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    this.player = true;
    this.gameWon = false;
    this.returnCurrentPlayer();
    console.log("[i] The game has been reset.");
  }

  // - Checks if the game has been won
  checkWin() {
    // Checks all rows
    if(this.checkRows() != 0) {
      this.gameWon = true;
      return this.checkRows();
    }

    // Checks all columns
    if(this.checkColumns() != 0) {
      this.gameWon = true;
      return this.checkColumns();
    }

    // Checks both diagonals
    if(this.checkDiagonals() != 0) {
      this.gameWon = true;
      return this.checkDiagonals();
    }

    return 0;
  }

  // - Returns the result of the rows
  checkRows() {
    // First row
    let result = this.board[0][0] + this.board[0][1] + this.board[0][2];
    if(result == 3 || result == -3) {
      return result;
    }

    // Second row
    result = this.board[1][0] + this.board[1][1] + this.board[1][2];
    if(result == 3 || result == -3) {
      return result;
    }

    // Third row
    result = this.board[2][0] + this.board[2][1] + this.board[2][2];
    if(result == 3 || result == -3) {
      return result;
    }

    return 0;
  }

  // - Returns the result of the columns
  checkColumns() {
    // First column
    let result = this.board[0][0] + this.board[1][0] + this.board[2][0];
    if(result == 3 || result == -3) {
      return result;
    }

    // Second column
    result = this.board[0][1] + this.board[1][1] + this.board[2][1];
    if(result == 3 || result == -3) {
      return result;
    }

    // Third column
    result = this.board[0][2] + this.board[1][2] + this.board[2][2];
    if(result == 3 || result == -3) {
      return result;
    }

    return 0;
  }

  // - Returns the result of the diagonals
  checkDiagonals() {
    // Top left to bottom right
    let result = this.board[0][0] + this.board[1][1] + this.board[2][2];
    if(result == 3 || result == -3) {
      return result;
    }

    // Top right to bottom left
    result = this.board[0][2] + this.board[1][1] + this.board[2][0];
    if(result == 3 || result == -3) {
      return result;
    }

    return 0;
  }

  // - Returns the current player to the parent component
  returnCurrentPlayer() {
    this.currentPlayer.emit(this.player? "X" : "O");
  }

}