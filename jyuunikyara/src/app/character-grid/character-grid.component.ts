import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlayerSnapshot, Character } from '../battle.service';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private matDialog: MatDialog) { }

  ngOnInit() { }

  range(size: number) {
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(i);
    }
    return out;
  }
}
