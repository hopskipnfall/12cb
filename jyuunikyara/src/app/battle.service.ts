import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Character {
  name: string;
  stocks: number;
}

export interface PlayerSnapshot {
  characters: Character[];
}

export interface GameSnapshot {
  player1: PlayerSnapshot;
  player2: PlayerSnapshot;
}

export interface Round {
  player1Character: string;
  player2Character: string;
  winner: string;
  remainingStocks: number;
}

export class RoundInProgress {
  player1?: Character;
  player2?: Character;

  winner = '';
}

export const CHARS = ['luigi', 'mario', 'donkey_kong', 'link', 'samus',
  'captain_falcon', 'ness', 'yoshi', 'kirby', 'fox', 'pikachu', 'jigglypuff'];

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  private initialStockCount = 4;

  private history: Round[] = [];

  private player1Name: BehaviorSubject<string> = new BehaviorSubject('');
  private player2Name: BehaviorSubject<string> = new BehaviorSubject('');

  private readonly currentRound: BehaviorSubject<RoundInProgress> = new BehaviorSubject({
    player1: null,
    player2: null,
    winner: '',
  });

  setInitialStockCount(count: number) {
    this.initialStockCount = count;
  }

  getPlayer1Name(): Observable<string> {
    return this.player1Name;
  }
  setPlayer1Name(name: string) {
    this.player1Name.next(name);
  }

  getPlayer2Name(): Observable<string> {
    return this.player2Name;
  }
  setPlayer2Name(name: string) {
    this.player2Name.next(name);
  }

  getRoundInProgress(): Observable<RoundInProgress> {
    return this.currentRound;
  }

  player1Select(character: Character) {
    const prev = this.currentRound.value;
    this.currentRound.next({
      player1: character,
      player2: prev.player2,
      winner: prev.winner,
    });
  }
  player2Select(character: Character) {
    const prev = this.currentRound.value;
    this.currentRound.next({
      player1: prev.player1,
      player2: character,
      winner: prev.winner,
    });
  }

  setRoundWinner(player: string) {
    const prev = this.currentRound.value;
    this.currentRound.next({
      player1: prev.player1,
      player2: prev.player2,
      winner: player,
    });
  }

  getHistory() {
    return this.history;
  }

  getInitialStockCount() {
    return this.initialStockCount;
  }

  getSnapshot(): GameSnapshot {
    const snapshot: GameSnapshot = {
      player1: { characters: CHARS.map(char => ({ name: char, stocks: this.initialStockCount })) },
      player2: { characters: CHARS.map(char => ({ name: char, stocks: this.initialStockCount })) },
    };
    for (const round of this.history) {
      if (round.winner === 'player1') {
        snapshot.player1.characters.find(char => char.name === round.player1Character).stocks = round.remainingStocks;
        snapshot.player2.characters.find(char => char.name === round.player2Character).stocks = 0;
      } else if (round.winner === 'player2') {
        snapshot.player1.characters.find(char => char.name === round.player1Character).stocks = 0;
        snapshot.player2.characters.find(char => char.name === round.player2Character).stocks = round.remainingStocks;
      }
    }
    return snapshot;
  }

  isGameOver(): boolean {
    const snapshot = this.getSnapshot();

    const player1Alive = snapshot.player1.characters.find(c => c.stocks > 0);
    const player2Alive = snapshot.player2.characters.find(c => c.stocks > 0);

    return !(player1Alive && player2Alive);
  }

  clear() {
    this.player1Name.next('');
    this.player2Name.next('');
    this.initialStockCount = 4;
    this.history = [];
  }

  submitRound(remainingStocks: number) {
    const inProgress = this.currentRound.value;
    const nextRound = new RoundInProgress();

    if (inProgress.winner === 'player1') {
      // HACK!!!! this makes it show up on CSS.
      inProgress.player1.stocks = remainingStocks;
      inProgress.player2.stocks = 0;

      nextRound.player1 = {name: inProgress.player1.name, stocks: remainingStocks};
    } else {
      // HACK!!!! this makes it show up on CSS.
      inProgress.player2.stocks = remainingStocks;
      inProgress.player1.stocks = 0;

      nextRound.player2 = {name: inProgress.player2.name, stocks: remainingStocks};
    }

    this.history.push({
      winner: inProgress.winner,
      remainingStocks,
      player1Character: inProgress.player1.name,
      player2Character: inProgress.player2.name,
    });

    this.currentRound.next(nextRound);

    // if (this.roundWinner === 'player1') {
    //   this.player2Selected = null;
    //   this.p2SelectMode = true;
    //   this.p1RemainingStocks = this.remainingStocksSelected;
    //   this.p2RemainingStocks = 0;
    // } else if (this.roundWinner === 'player2') {
    //   this.player1Selected = null;
    //   this.p1SelectMode = true;
    //   this.p2RemainingStocks = this.remainingStocksSelected;
    //   this.p1RemainingStocks = 0;
    // }
    // this.remainingStocksSelected = 0;
    // this.roundWinner = null;
    // this.gameOver = this.battleService.isGameOver();

    // this.encoded = this.encoder.encodeHistory(this.getHistory());
    // this.decoded = this.encoder.decodeHistory(this.encoded);
    // if (this.gameOver) {
    //   this.router.navigate([`/results/${this.encoded}`, { p1: this.player1Name, p2: this.player2Name }]);
    // }
  }
}
