import { Component, OnInit, ViewChild, ElementRef, Sanitizer, SecurityContext } from '@angular/core';
import { HistoryEncoderService } from '../history-encoder.service';
import { ActivatedRoute } from '@angular/router';
import { Round, GameSnapshot } from '../battle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from '../clipboard.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-winscreen',
  templateUrl: './winscreen.component.html',
  styleUrls: ['./winscreen.component.sass']
})
export class WinscreenComponent implements OnInit {
  @ViewChild('player1Default') player1Default: ElementRef;
  @ViewChild('player2Default') player2Default: ElementRef;
  @ViewChild('copiedToClipboard') copiedToClipboard: ElementRef;

  player1Name = '';
  player2Name = '';
  history: Round[] = [];
  snapshot: GameSnapshot = null;
  initialStockCount = 4;
  winnerName = '';
  winner = '';
  url = '';

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sanitizer: Sanitizer,
    private encoder: HistoryEncoderService,
    private clipboard: ClipboardService,
    public themeService: ThemeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(m => {
      this.player1Name = m.get('p1') || '';
      this.player2Name = m.get('p2') || '';

      this.history = this.encoder.decodeHistory(m.get('historyEncoding'));
      this.snapshot = this.encoder.toSnapshot(this.history);
      this.winner = this.history[this.history.length - 1].winner;
      this.winnerName = (this.winner === 'player1' ? this.player1Name : this.player2Name) || this.player1Default.nativeElement.textContent;
    });
    this.url = this.sanitizer.sanitize(SecurityContext.URL, window.location.href);
  }

  range(size: number) {
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(i);
    }
    return out;
  }

  copyUrl() {
    this.clipboard.copy(this.url);

    this.snackBar.open(this.copiedToClipboard.nativeElement.textContent, null, {
      duration: 2500,
    });
  }
}
