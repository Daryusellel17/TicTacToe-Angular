import { Component, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GameBoardComponent implements OnInit {

  constructor() {  }

  ngOnInit() {
    this.returnCurrentPlayer();
    console.log("[i] Game board initiated.");
  }

  board: number[][] = [ // 0 = empty, 1 = X, -1 = O
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]; 
  iconNames: string[][] = [ // Matric of icon names
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  player: boolean = true; // true = X, false = O
  gameWon: number = 0; // 0 = game continues, 1 = game won, 2 = draw
  // Returns the current player represented by a string
  @Output() currentPlayer = new EventEmitter<string>();
  @Output() winner = new EventEmitter<string>();
  @Output() gameStatus = new EventEmitter<number>();

  // - Changes the tunr of the player
  changePlayer() {
    this.player = !this.player;
  }

  // - The player takes their turn
  async place(row: number, col: number) {
    if(this.board[row][col] == 0 && this.gameWon==0) {
      this.board[row][col] = this.player? 1 : -1;
      this.iconNames[row][col] = this.player? "close-outline" : "ellipse-outline";

      // Checks the winner if there is one
      if(this.checkWin()!=0) {
        console.log("[+] Player "+(this.player? 'X':'O')+" has won the game!");
      }
      else {
        this.changePlayer();
      }

      // Returns the winner if there is one, and the game's status
      if(this.gameWon!=0) {
        this.returnGameStatus();
        this.returnWinner();
      }

      this.returnCurrentPlayer();
    }
  }

  // - Resets the game board
  async resetGame(): Promise<void> {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    this.iconNames = [  // - This approach will always give an error
      ["a", "a", "a"],  //   because Angular won't find the 'a' icon,
      ["a", "a", "a"],  //   but it works for resetting the icons on
      ["a", "a", "a"]   //   on the board.
    ];
    this.player = true;
    this.gameWon = 0;
    this.returnCurrentPlayer();
    this.returnGameStatus();
    console.log("[i] The game has been reset.");
  }

  // - Checks if the game has been won
  checkWin() {
    if(!this.checkDraw()) {
      // Checks all rows
      if(this.checkRows() != 0) {
        this.gameWon = 1;
        return this.checkRows();
      }

      // Checks all columns
      if(this.checkColumns() != 0) {
        this.gameWon = 1;
        return this.checkColumns();
      }

      // Checks both diagonals
      if(this.checkDiagonals() != 0) {
        this.gameWon = 1;
        return this.checkDiagonals();
      }
    } else {
      this.gameWon = 2;
      console.log("[i] The game has ended in a draw.");
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

  // - Checks if the board is full
  checkDraw() {
    for(let i=0; i<3; i++) {
      for(let j=0; j<3; j++) {
        if(this.board[i][j] == 0) {
          return false;
        }
      }
    }
    return true;
  }

  // - Returns the current player to the parent component
  returnCurrentPlayer() {
    this.currentPlayer.emit(this.player? "X" : "O");
  }

  // - Returns the game status to the parent component
  returnGameStatus() {
    this.gameStatus.emit(this.gameWon);
  }

  // - Returns the winner to the parent component
  returnWinner() {
    this.winner.emit(this.gameWon==2? "Draw" : this.gameWon==1? (this.player? "X" : "O"): '');
  }

}