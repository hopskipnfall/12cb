import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass'],
})
export class CharacterComponent implements OnInit {

  @Input() character: string;
  @Input() stocks: number;
  @Input() initialStockCount: number;

  constructor() { }

  ngOnInit() {
  }

  range(size: number) {
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(i);
    }
    return out;
  }
}
