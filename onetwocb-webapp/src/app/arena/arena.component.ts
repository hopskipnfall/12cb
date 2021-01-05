import { Component, OnInit } from '@angular/core';
import {
  CellState,
  CharacterGridCell,
  CharacterGridStyle,
} from 'onetwocb-components';
import { Subscription } from 'rxjs';
import {
  BattleService,
  Character,
  GameSnapshot,
  Round,
  RoundInProgress,
} from '../battle.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit {
  subscriptions: Subscription[] = [];

  p1Data: CharacterGridCell[];
  p2Data: CharacterGridCell[];

  player1Name: string;
  player2Name: string;

  snapshot: GameSnapshot;

  characterGridStyle: CharacterGridStyle = {
    selectableBgColor: '#616060',
    selectedBgColor: 'magenta',
    disabledBgColor: 'blue',
  };

  // DELETE ME
  roundWinner: string;
  player1Selected: Character;
  player2Selected: Character;
  p1SelectMode = true;
  p2SelectMode = true;
  remainingStocksSelected = 0;
  initialStockCount = 0;
  gameOver = false;
  initialCharSelect = true;
  decoded: Round[];
  p1RemainingStocks = 0;
  p2RemainingStocks = 0;

  constructor(private battleService: BattleService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.battleService.getPlayer1Name().subscribe((name) => {
        this.player1Name = name;
      }),

      this.battleService.getPlayer2Name().subscribe((name) => {
        this.player2Name = name;
      }),

      this.battleService
        .getRoundInProgress()
        .subscribe((round: RoundInProgress) => {
          console.error('new round!', round);
          this.roundWinner = round.winner;
          this.player1Selected = round.player1;
          this.player2Selected = round.player2;

          this.p1SelectMode = !round.player1;
          this.p2SelectMode = !round.player2;
          this.initialCharSelect =
            (!round.player1 || !round.player2) &&
            this.battleService.getHistory().length === 0;

          this.p1RemainingStocks = round.player1 ? round.player1.stocks : 0;
          this.p2RemainingStocks = round.player2 ? round.player2.stocks : 0;
          this.remainingStocksSelected = 0;

          this.buildPlayerData();
        }),

      this.battleService
        .getGameSnapshot()
        .subscribe((snapshot: GameSnapshot) => {
          console.log('snap', snapshot);
          this.snapshot = snapshot;
          this.buildPlayerData();
        }),

      // this.route.paramMap.subscribe((map) => {
      //   console.log('It changed!!!!!!!!', map);
      // }),
    );
  }

  private buildPlayerData() {
    if (!this.snapshot) {
      return;
    }
    this.p1Data = this.snapshot.player1.characters.map((char) => {
      let state: CellState;
      if (char.stocks === 0) {
        state = 'disabled';
      } else if (
        this.player1Selected &&
        this.player1Selected.name === char.name
      ) {
        state = 'selected';
      } else {
        state = 'selectable';
      }
      const out: CharacterGridCell = {
        id: char.name,
        imageUrl: `assets/icons/nanakyou/${char.name}.png`,
        state,
        clickable: true,
        selectedBgColorOverride: this.nanakyouAccentColorForCharacter(
          char.name,
        ),
      };
      return out;
    });

    this.p2Data = this.snapshot.player2.characters.map((char) => {
      let state: CellState;
      if (char.stocks === 0) {
        state = 'disabled';
      } else if (
        this.player2Selected &&
        this.player2Selected.name === char.name
      ) {
        state = 'selected';
      } else {
        state = 'selectable';
      }
      const out: CharacterGridCell = {
        id: char.name,
        imageUrl: `assets/icons/nanakyou/${char.name}.png`,
        state,
        clickable: true,
        selectedBgColorOverride: this.nanakyouAccentColorForCharacter(
          char.name,
        ),
      };
      return out;
    });
  }

  private nanakyouAccentColorForCharacter(
    character: string,
  ): string | undefined {
    console.log('logs', character);
    switch (character) {
      case 'captain falcon':
        return undefined;
      case 'link':
        return '#c000ff';
      case 'jigglypuff':
        return '#00ffff';
      case 'donkey_kong':
        return '#c000ff';
      case 'ness':
        return '#00b8ff';
      case 'fox':
        return '#00a1ff';
      default:
        return undefined;
    }
  }

  tileClicked(id: string) {
    alert(`You clicked ${id}!`);
  }

  characterClicked(player: string, charName: string) {
    let character: Character;
    if (player === 'player1') {
      character = {
        name: charName,
        stocks: this.snapshot.player1.characters.find(
          (char) => char.name === charName,
        ).stocks,
      };
    } else if (player === 'player2') {
      character = {
        name: charName,
        stocks: this.snapshot.player2.characters.find(
          (char) => char.name === charName,
        ).stocks,
      };
    }

    if (character.stocks === 0) {
      return;
    }

    if (player === 'player1' && this.p1SelectMode) {
      this.battleService.player1Select(character);
    } else if (player === 'player2' && this.p2SelectMode) {
      this.battleService.player2Select(character);
    }
  }
}
