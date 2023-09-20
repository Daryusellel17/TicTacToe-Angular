import { Component, Input, ViewChild} from '@angular/core';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() { }

  @ViewChild('gameBoard') gameBoard!: GameBoardComponent;
  @Input() player: string = "";
  @Input() winner = "";
  @Input() gameStatus: number = 0; // 0 = game continues, 1 = someone won, 2 = draw

  // - Resets the game board
  resetGame() {
    this.gameBoard.resetGame();
  }

  // - Gets the current player from the child component
  getCurrentPlayer($event: string) {
    this.player = $event;
  }

  // - Gets the game status from the child component
  getGameStatus($event: number) {
    this.gameStatus = $event;
  }

  // - Gets the winner from the child component
  getWinner($event: string) {
    this.winner = $event;
  }
  
}
