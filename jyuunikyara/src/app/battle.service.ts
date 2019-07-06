import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  private player1: string;
  private player2: string;
  private initialStockCount: number;

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
}
