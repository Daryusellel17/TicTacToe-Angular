import { Component, Input } from '@angular/core';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private board: GameBoardComponent) {}


  @Input() currentPlayer: string = "";
  @Input() gameStatus: boolean = false; // true = game won, false = game continues

  // - Resets the game board
  resetGame() {
    this.board.resetGame();
  }

  // - Gets the current player from the child component
  getCurrentPlayer($event: string) {
    this.currentPlayer = $event;
  }

  // - Gets the game status from the child component
  getGameStatus($event: boolean) {
    this.gameStatus = $event;
  }
  
}
