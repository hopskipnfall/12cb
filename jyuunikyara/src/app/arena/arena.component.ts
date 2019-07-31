import { Component, OnInit, Input } from '@angular/core';
import { BattleService, GameSnapshot, Character, Round, CHARS } from '../battle.service';
import { Router } from '@angular/router';
import { HistoryEncoderService } from '../history-encoder.service';

enum GameState {
  UNKNOWN = 0,
  INITIAL_CHARACTER_SELECT = 1,
  FIGHTING = 2,
}

export interface RoundReplay {
  player1: {
    character: string;
    showImage: boolean;
    stocks: number;
  };
  player2: {
    character: string;
    showImage: boolean;
    stocks: number;
  };
}

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.sass']
})
export class ArenaComponent implements OnInit {
  gameState: GameState = GameState.INITIAL_CHARACTER_SELECT;

  player1Selected: Character;
  player2Selected: Character;

  player1Name = '';
  player2Name = '';

  roundWinner = '';

  p1RemainingStocks = 0;
  p2RemainingStocks = 0;

  snapshot: GameSnapshot;

  p1SelectMode = true;
  p2SelectMode = true;

  remainingStocksSelected = 0;

  initialStockCount = 0;

  gameOver = false;

  initialCharSelect = true;

  encoded: string;
  decoded: Round[];

  constructor(private battleService: BattleService, private router: Router, private encoder: HistoryEncoderService) {}

  ngOnInit() {
    // this.player1Name = this.battleService.getPlayer1Name();
    // this.player2Name = this.battleService.getPlayer2Name();
    this.initialStockCount = this.battleService.getInitialStockCount();

    // this.battleService.recordRound({player1Character: 'link', player2Character: 'fox', winner: 'player1', remainingStocks: 2});
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'pikachu', winner: 'player1', remainingStocks: 1});
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'jigglypuff', winner: 'player1', remainingStocks: 1});
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'ness', winner: 'player1', remainingStocks: 1});
    // this.battleService.recordRound({player1Character: 'link', player2Character: 'kirby', winner: 'player2', remainingStocks: 2});
    // this.battleService.recordRound({player1Character: 'ness', player2Character: 'kirby', winner: 'player1', remainingStocks: 4});
    // this.battleService.recordRound({player1Character: 'ness', player2Character: 'yoshi', winner: 'player1', remainingStocks: 2});
    // this.battleService.recordRound({player1Character: 'ness', player2Character: 'mario', winner: 'player2', remainingStocks: 3});
    // this.battleService.recordRound({player1Character: 'luigi', player2Character: 'mario', winner: 'player2', remainingStocks: 1});
    // this.battleService.recordRound({player1Character: 'captain_falcon', player2Character: 'mario', winner: 'player1', remainingStocks: 3});
    // this.battleService.recordRound({player1Character: 'captain_falcon', player2Character: 'donkey_kong', winner: 'player1', remainingStocks: 3});
    // this.battleService.recordRound({player1Character: 'captain_falcon', player2Character: 'luigi', winner: 'player1', remainingStocks: 3});
    // this.battleService.recordRound({player1Character: 'captain_falcon', player2Character: 'samus', winner: 'player1', remainingStocks: 3});
    // this.battleService.recordRound({player1Character: 'captain_falcon', player2Character: 'link', winner: 'player1', remainingStocks: 3});
    // this.battleService.recordRound({player1Character: 'captain_falcon', player2Character: 'luigi', winner: 'player1', remainingStocks: 3});
    // this.characterClicked('player1', {name: 'captain_falcon', stocks: 3});
    // this.characterClicked('player2', {name: 'captain_falcon', stocks: 4});
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

    if (this.player1Selected && this.player2Selected) {
      this.initialCharSelect = false;
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
    this.gameOver = this.battleService.isGameOver();

    this.encoded = this.encoder.encodeHistory(this.getHistory());
    this.decoded = this.encoder.decodeHistory(this.encoded);
    if (this.gameOver) {
      this.router.navigate([`/results/${this.encoded}`, {p1: this.player1Name, p2: this.player2Name}]);
    }
  }

  getHistory() {
    return this.battleService.getHistory();
  }

  maybeSetRemainingStocks(gate: boolean, remainingStocks: number) {
    if (gate) {
      this.remainingStocksSelected = remainingStocks;
    }
  }

  updateName(player: string, name: string) {
    if (player === 'player1') {
      this.player1Name = name;
      this.battleService.setPlayer1Name(name);
    } else {
      this.player2Name = name;
      this.battleService.setPlayer2Name(name);
    }
  }
}
