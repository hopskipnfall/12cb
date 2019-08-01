import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlayerSnapshot } from '../battle.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.sass']
})
export class CharacterGridComponent implements OnInit {
  @Output() clickCharacter: EventEmitter<any> = new EventEmitter();
  @Output() nameUpdated: EventEmitter<string> = new EventEmitter();

  @Input() playerSnapshot: PlayerSnapshot;
  @Input() selectedCharacter: string;
  @Input() playerName: string;
  @Input() selectMode: boolean;
  @Input() initialStockCount: boolean;
  @Input() playerNamePlaceholder: string;
  @Input() readyToFight: boolean;
  @Input() nameStatic: boolean;

  player1: string;

  locked = false;

  constructor(private matDialog: MatDialog) { }

  ngOnInit() { }
}
