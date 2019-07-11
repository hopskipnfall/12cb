import { Component, OnInit, Input } from '@angular/core';
import { BattleService, GameSnapshot, Character } from '../battle.service';
import { Router } from '@angular/router';

enum GameState {
  UNKNOWN = 0,
  CHARACTER_SELECT = 1,
  FIGHTING = 2,
}

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.sass']
})
export class ArenaComponent implements OnInit {
  // @Input() chooseYourCharacterString: string;

  gameState: GameState = GameState.CHARACTER_SELECT;

  player1Selected: Character;
  player2Selected: Character;

  player1Name: string;
  player2Name: string;

  roundWinner = '';

  p1RemainingStocks = 0;
  p2RemainingStocks = 0;

  snapshot: GameSnapshot;

  p1SelectMode = true;
  p2SelectMode = true;

  remainingStocksSelected = 0;

  initialStockCount = 0;

  constructor(private battleService: BattleService, private router: Router) {}

  ngOnInit() {
    this.player1Name = this.battleService.getPlayer1Name();
    this.player2Name = this.battleService.getPlayer2Name();
    this.initialStockCount = this.battleService.getInitialStockCount();

    if (!this.player1Name || !this.player2Name) {
      this.router.navigate(['/new']);
    }
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'fox', winner: 'player1', remainingStocks: 2});
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'pikachu', winner: 'player1', remainingStocks: 1});
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'jigglypuff', winner: 'player1', remainingStocks: 1});
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'ness', winner: 'player1', remainingStocks: 1});
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'kirby', winner: 'player1', remainingStocks: 1});
    this.snapshot = this.battleService.getSnapshot();
  }

  characterClicked(player: string, event: Character) {
    if (event.stocks === 0) {
      return;
    }

    if (player === 'player1' && this.p1SelectMode) {
      this.player1Selected = event;
      this.p1SelectMode = false;
      this.p1RemainingStocks = event.stocks;
    } else if (player === 'player2' && this.p2SelectMode) {
      this.player2Selected = event;
      this.p2SelectMode = false;
      this.p2RemainingStocks = event.stocks;
    }
  }

  playerCharClicked(player: string) {
    if (this.player1Selected && this.player2Selected) {
      this.roundWinner = player;
    }
  }

  range(size: number) {
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(i);
    }
    return out;
  }

  submitRound() {
    const thing = {
      winner: this.roundWinner,
      player1Character: this.player1Selected.name,
      player2Character: this.player2Selected.name,
      remainingStocks: this.remainingStocksSelected,
    };
    console.log(thing);
    this.battleService.recordRound(thing);
    this.snapshot = this.battleService.getSnapshot();
    if (this.roundWinner === 'player1') {
      this.player2Selected = null;
      this.p2SelectMode = true;
      this.p1RemainingStocks = this.remainingStocksSelected;
      this.p2RemainingStocks = 0;
    } else if (this.roundWinner === 'player2') {
      this.player1Selected = null;
      this.p1SelectMode = true;
      this.p2RemainingStocks = this.remainingStocksSelected;
      this.p1RemainingStocks = 0;
    }
    this.remainingStocksSelected = 0;
    this.roundWinner = null;
  }
}
