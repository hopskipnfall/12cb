import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BattleService, GameSnapshot, PlayerSnapshot } from '../battle.service';
import { MatDialog } from '@angular/material/dialog';
import { CharacterPickerComponent } from '../character-picker/character-picker.component';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.sass']
})
export class CharacterGridComponent implements OnInit {
  @Output() clickCharacter: EventEmitter<any> = new EventEmitter();
  @Input() playerSnapshot: PlayerSnapshot;
  @Input() selectedCharacter: string;
  @Input() playerName: string;
  @Input() selectMode: boolean;

  player1: string;

  locked = false;

  constructor(private matDialog: MatDialog) {}

  ngOnInit() {
  }

  launchPicker(player: string) {
    this.matDialog.open(CharacterPickerComponent, {
      data: this.playerSnapshot,
      width: '300px',
      // height: '530px', // 100%
      disableClose: true,
      // HOW DO I SET THE COMPONENT TO BE FLEX BOX FLEX DIRECTION COLUMN OMG
      // panelClass: 'dialog-wrapper'
    });
  }
  // click(character: string) {
  //   console.log('aaaaaa');
  //   this.clickCharacter.emit(character);
  // }
}
