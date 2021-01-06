import { Component, OnInit } from '@angular/core';
import { CharacterGridCell, CharacterGridStyle } from 'onetwocb-components';

function makeCharCell(name: string): CharacterGridCell {
  return {
    id: name,
    imageUrl: `assets/icons/nanakyou/${name}.png`,
    state: 'selectable',
    clickable: true,
  };
}

@Component({
  selector: 'app-arena-simple',
  templateUrl: './arena-simple.component.html',
  styleUrls: ['./arena-simple.component.scss'],
})
export class ArenaSimpleComponent implements OnInit {
  p1Data: CharacterGridCell[] = [
    makeCharCell('captain_falcon'),
    makeCharCell('donkey_kong'),
    makeCharCell('fox'),
    makeCharCell('jigglypuff'),
    makeCharCell('kirby'),
    makeCharCell('link'),
    makeCharCell('luigi'),
    makeCharCell('mario'),
    makeCharCell('ness'),
    makeCharCell('pikachu'),
    makeCharCell('samus'),
    makeCharCell('yoshi'),
  ];
  p2Data: CharacterGridCell[] = [
    makeCharCell('captain_falcon'),
    makeCharCell('donkey_kong'),
    makeCharCell('fox'),
    makeCharCell('jigglypuff'),
    makeCharCell('kirby'),
    makeCharCell('link'),
    makeCharCell('luigi'),
    makeCharCell('mario'),
    makeCharCell('ness'),
    makeCharCell('pikachu'),
    makeCharCell('samus'),
    makeCharCell('yoshi'),
  ];

  characterGridStyle: CharacterGridStyle = {
    selectableBgColor: '#616060',
    selectedBgColor: 'magenta',
    disabledBgColor: 'blue',
  };

  ngOnInit(): void {}

  characterClicked(playerId: string, charId: string) {
    const cell = (playerId === 'player1' ? this.p1Data : this.p2Data).find(
      (c) => c.id === charId,
    );
    if (cell.state === 'selectable') {
      cell.state = 'disabled';
    } else {
      cell.state = 'selectable';
    }
  }
}
