import { Component, OnInit } from '@angular/core';
import { CharacterGridCell, CharacterGridStyle } from 'onetwocb-components';


let i = 0;
const props: ('selectable' | 'selected' | 'disabled')[] = [
  'selectable',
  'selected',
  'disabled',
];

function makeCharCell(name: string): CharacterGridCell {
  return {
    id: name,
    imageUrl: `assets/icons/nanakyou/${name}.png`,
    state: props[i++ % 3],
    clickable: true,
  };
}

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'example-app';

  characterGridData: CharacterGridCell[] = [
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

  tileClicked(id: string) {
    alert(`You clicked ${id}!`);
  }
}
