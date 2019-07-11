import { Injectable } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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
  private player1: string;
  private player2: string;
  private initialStockCount: number = 4;

  private history: Round[] = [];

  setPlayerNames(player1: string, player2: string) {
    this.player1 = player1;
    this.player2 = player2;
  }

  setInitialStockCount(count: number) {
    this.initialStockCount = count;
  }

  getPlayer1Name() {
    return this.player1;
  }

  getPlayer2Name() {
    return this.player2;
  }

  recordRound(round: Round) {
    this.history.push(round);
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
}
