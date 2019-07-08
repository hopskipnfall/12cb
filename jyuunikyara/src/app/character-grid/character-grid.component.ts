import { Component, OnInit } from '@angular/core';
import { BattleService, GameSnapshot } from '../battle.service';
import { MatDialog } from '@angular/material/dialog';
import { CharacterPickerComponent } from '../character-picker/character-picker.component';

const SELECTION = 'selection';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.sass']
})
export class CharacterGridComponent implements OnInit {
  player1: string;
  player2: string;
  snapshot: GameSnapshot;

  gameState = SELECTION;

  locked = false;

  constructor(private battleService: BattleService, private matDialog: MatDialog) {}

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

  launchPicker(player: string) {
    this.matDialog.open(CharacterPickerComponent, {
      data: this.snapshot.player1,
      width: '300px',
      // height: '530px', // 100%
      disableClose: true,
      // HOW DO I SET THE COMPONENT TO BE FLEX BOX FLEX DIRECTION COLUMN OMG
      // panelClass: 'dialog-wrapper'
    });
  }
}
