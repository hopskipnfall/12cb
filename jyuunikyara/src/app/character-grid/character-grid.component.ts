import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlayerSnapshot, Character } from '../battle.service';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../theme.service';

const CHARACTER_POSITION_MAPPING = {
  'luigi': 1,
  'mario': 1,
  'donkey_kong': 2,
  'link': 2,
  'samus': 3,
  'captain_falcon': 3,
  'ness': 4,
  'yoshi': 4,
  'kirby': 5,
  'fox': 5,
  'pikachu': 6,
  'jigglypuff': 6,
};

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.sass']
})
export class CharacterGridComponent implements OnInit {
  @Output() clickCharacter: EventEmitter<any> = new EventEmitter();
  @Output() nameUpdated: EventEmitter<string> = new EventEmitter();
  @Output() selectedRemainingStocks: EventEmitter<number> = new EventEmitter();

  @Input() initialStockCount: number;
  @Input() nameStatic: boolean;
  @Input() playerName: string;
  @Input() playerNamePlaceholder: string;
  @Input() playerSnapshot: PlayerSnapshot;
  @Input() readyToFight: boolean;
  @Input() selectedCharacter: Character;
  @Input() selectMode: boolean;
  @Input() showStockSelector: boolean;

  player1: string;

  locked = false;

  constructor(private matDialog: MatDialog, public themeService: ThemeService) { }

  ngOnInit() { }

  range(size: number) {
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(i);
    }
    return out;
  }

  getPositionForChar(char: Character) {
    if (!char) {
      return 0;
    }
    return CHARACTER_POSITION_MAPPING[char.name];
  }
}
