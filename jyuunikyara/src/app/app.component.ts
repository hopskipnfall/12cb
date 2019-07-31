import { Component, Inject, LOCALE_ID } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectChange } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { BattleService } from './battle.service';
import { WinscreenComponent } from './winscreen/winscreen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'jyuunikyara';

  readonly LANGUAGE_COOKIE_NAME = 'language_override';

  readonly LANGUAGES = [
    {code: 'en', display: 'English'},
    {code: 'ja', display: '日本語'},
  ];
  selectedLanguage: string;

  mobileQuery: MediaQueryList;

  constructor(
      @Inject(LOCALE_ID) locale: string,
      private cookieService: CookieService,
      media: MediaMatcher,
      private router: Router,
      private route: ActivatedRoute,
      private battleService: BattleService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

    const languageOverride = cookieService.get(this.LANGUAGE_COOKIE_NAME);
    if (languageOverride && this.LANGUAGES.some(l => l.code === languageOverride)) {
      this.selectedLanguage = languageOverride;
    } else {
      this.selectedLanguage = locale.split('-')[0];
    }
  }

  changeLocale(event: MatSelectChange) {
    this.cookieService.set(this.LANGUAGE_COOKIE_NAME, this.selectedLanguage, null, '/');
    window.location.reload();
  }

  showButton() {
    if (!this.route.children || this.route.children.length === 0) {
      return false;
    }
    return this.route.snapshot.children[0].component === WinscreenComponent;
  }

  newBattle() {
    this.battleService.clear();
    this.router.navigate(['/']);
  }

  maybeClearAndGoHome() {
    if (this.showButton()) {
      this.battleService.clear();
      this.router.navigate(['/']);
    }
  }
}
