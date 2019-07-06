import { Component, OnInit } from '@angular/core';
import { BattleService, GameSnapshot } from '../battle.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.sass']
})
export class CharacterGridComponent implements OnInit {
  player1: string;
  player2: string;
  snapshot: GameSnapshot;

  constructor(private battleService: BattleService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.player1 = this.battleService.getPlayer1Name();
    this.player2 = this.battleService.getPlayer2Name();

    const chars = [
      'luigi', 'mario', 'donkey_kong', 'link', 'samus', 'captain_falcon',
       'ness', 'yoshi', 'kirby', 'fox', 'pikachu', 'jigglypuff'];

    this.snapshot = {
      player1: {characters: chars.map(char => ({name: char, stocks: 4}))},
      player2: {characters: chars.map(char => ({name: char, stocks: 4}))},
    };
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }
}
