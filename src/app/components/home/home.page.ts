import { Component, Input } from '@angular/core';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public board: GameBoardComponent) {}


  @Input() currentPlayer: string = "";

  // - Resets the game board
  resetGame() {
    this.board.resetGame();
    
  }

  getCurrentPlayer($event: string) {
    this.currentPlayer = $event;
  }
  
}
