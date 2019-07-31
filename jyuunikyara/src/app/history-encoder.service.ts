import { Injectable } from '@angular/core';
import { Round, CHARS, GameSnapshot } from './battle.service';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$-_'.split('');

@Injectable({
  providedIn: 'root'
})
export class HistoryEncoderService {
  initialStockCount = 4; // TODO: Make this configurable.

  constructor() { }

  encodeHistory(history: Round[]): string {
    let out = 'a';
    for (const h of history) {
      const winningPort = h.winner === 'player1' ? 1 : 2;
      const startingStocks = 4;
      const remainingP1Stocks = h.winner === 'player1' ? h.remainingStocks : 0;
      const remainingP2Stocks = h.winner === 'player2' ? h.remainingStocks : 0;

      out += ALPHABET[remainingP1Stocks * 12 + CHARS.indexOf(h.player1Character)];
      out += ALPHABET[remainingP2Stocks * 12 + CHARS.indexOf(h.player2Character)];
    }
    return out;
  }

  decodeHistory(e: string): Round[] {
    if (!e || e.length === 0 || e[0] !== 'a') {
      throw Error('invalid!');
    }
    const h = [];

    let i = 1;
    if (e.length % 2 !== 1 ) {
      throw Error('sad stuff');
    }
    while (i < e.length) {
      const n1 = ALPHABET.indexOf(e.charAt(i));
      const p1Stocks = Math.floor(n1 / 12);
      const n2 = ALPHABET.indexOf(e.charAt(i + 1));
      const p2Stocks = Math.floor(n2 / 12);

      h.push({
        player1Character: CHARS[n1 % 12],
        player2Character: CHARS[n2 % 12],
        winner: p1Stocks > 0 ? 'player1' : 'player2',
        remainingStocks: p1Stocks > 0 ? p1Stocks : p2Stocks,
      });
      i += 2;
    }

    return h;
  }

  toSnapshot(history: Round[]): GameSnapshot {
    const snapshot: GameSnapshot = {
      player1: {characters: CHARS.map(char => ({name: char, stocks: this.initialStockCount}))},
      player2: {characters: CHARS.map(char => ({name: char, stocks: this.initialStockCount}))},
    };
    for (const round of history) {
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
}
