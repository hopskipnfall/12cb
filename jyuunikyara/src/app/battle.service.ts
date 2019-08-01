import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

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

  recordRound(round: Round) {
    this.history.push(round);
  }

  getHistory() {
    return this.history;
  }

  getInitialStockCount() {
    return this.initialStockCount;
  }

  getSnapshot(): GameSnapshot {
    const snapshot: GameSnapshot = {
      player1: {characters: CHARS.map(char => ({name: char, stocks: this.initialStockCount}))},
      player2: {characters: CHARS.map(char => ({name: char, stocks: this.initialStockCount}))},
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
    const player2Alive =  snapshot.player2.characters.find(c => c.stocks > 0);

    return !(player1Alive && player2Alive);
  }

  clear() {
    this.player1Name.next('');
    this.player2Name.next('');
    this.initialStockCount = 4;
    this.history = [];
  }
}
