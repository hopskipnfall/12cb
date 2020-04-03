import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.sass']
})
export class StockSelectorComponent {
  @Output() selectedRemainingStocks: EventEmitter<number> = new EventEmitter();

  @Input() initialStockCount: number;
  @Input() maxStockCount: number;
  @Input() pos: number;
  @Input() bgImage: string;

  constructor() { }

  recordStocks(stocks: number) {
    if (stocks <= this.maxStockCount) {
      console.log(stocks);
      this.selectedRemainingStocks.emit(stocks);
    }
  }

  range(size: number) {
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(i);
    }
    return out;
  }
}
