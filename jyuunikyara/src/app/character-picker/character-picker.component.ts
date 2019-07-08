import { Component, OnInit, Inject } from '@angular/core';
import { PlayerSnapshot } from '../battle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-character-picker',
  templateUrl: './character-picker.component.html',
  styleUrls: ['./character-picker.component.sass']
})
export class CharacterPickerComponent implements OnInit {
  player: PlayerSnapshot;
  chosenCharacter = 'kirby';

  constructor(public dialogRef: MatDialogRef<CharacterPickerComponent>, @Inject(MAT_DIALOG_DATA) public data: PlayerSnapshot) {
    this.player = data;
  }

  ngOnInit() {
  }

  select(character: string) {
    this.dialogRef.close(character);
  }
}
