import { Component, OnInit } from '@angular/core';
import { BattleService } from '../battle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass']
})
export class SetupComponent implements OnInit {
  stockCount = 4;
  player1Name = 'Player 1';
  player2Name = 'Player 2';

  constructor(private battleService: BattleService, private router: Router) { }

  ngOnInit() {
  }

  startBattle() {
    // this.battleService.setInitialStockCount(this.stockCount);
    // this.battleService.setPlayerNames(this.player1Name, this.player2Name);

    // this.router.navigate(['/battle']);
  }
}
