import { Component, OnInit } from '@angular/core';
import { BattleService, GameSnapshot } from '../battle.service';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.sass']
})
export class CharacterGridComponent implements OnInit {
  player1: string;
  player2: string;
  snapshot: GameSnapshot;

  constructor(private battleService: BattleService) { }

  ngOnInit() {
    this.player1 = this.battleService.getPlayer1Name();
    this.player2 = this.battleService.getPlayer2Name();

    const chars = [
      'Luigi', 'Mario', 'Donkey Kong', 'Link', 'Samus', 'Captain Falcon',
       'Ness', 'Yoshi', 'Kirby', 'Fox', 'Pikachu', 'Jigglypuff'];

    this.snapshot = {
      player1: {characters: chars.map(char => ({name: char, stocks: 4}))},
      player2: {characters: chars.map(char => ({name: char, stocks: 4}))},
    };
  }
}
