import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass'],
})
export class CharacterComponent implements OnInit {

  @Input() character: string;
  @Input() stocks: number;

  constructor() { }

  ngOnInit() {
  }

}
