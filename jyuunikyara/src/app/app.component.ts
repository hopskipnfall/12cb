import { BattleService, CHARS } from './battle.service';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectChange } from '@angular/material/select';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { WinscreenComponent } from './winscreen/winscreen.component';
import { ThemeService, THEMES, Theme } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'jyuunikyara';

  readonly LANGUAGE_COOKIE_NAME = 'language_override';

  readonly LANGUAGES = [
    { code: 'en', display: 'English' },
    { code: 'ja', display: '日本語' },
  ];
  selectedLanguage: string;
  selectedTheme: string;

  randomCharacter = CHARS[Math.floor(Math.random() * CHARS.length)];

  mobileQuery: MediaQueryList;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private cookieService: CookieService,
    media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private battleService: BattleService,
    private themeService: ThemeService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

    const languageOverride = cookieService.get(this.LANGUAGE_COOKIE_NAME);
    if (languageOverride && this.LANGUAGES.some(l => l.code === languageOverride)) {
      this.selectedLanguage = languageOverride;
    } else {
      this.selectedLanguage = locale.split('-')[0];
    }

    this.selectedTheme = themeService.getTheme().value.name;
  }

  changeLocale(event: MatSelectChange) {
    this.cookieService.set(this.LANGUAGE_COOKIE_NAME, this.selectedLanguage, null, '/');
    // Go up one level and let the server decide where to send you.
    window.location.href = '../';
  }

  changeTheme(event: MatSelectChange) {
    this.themeService.setTheme(THEMES.get(this.selectedTheme));
  }

  showButton() {
    if (!this.route.children || this.route.children.length === 0) {
      return false;
    }
    return this.route.snapshot.children[0].component === WinscreenComponent;
  }

  newBattle() {
    this.battleService.clear();
    // Go up one level and let the server decide where to send you.
    window.location.href = '../';
  }

  maybeClearAndGoHome() {
    if (this.showButton()) {
      this.battleService.clear();
      // Go up one level and let the server decide where to send you.
      window.location.href = '../';
    }
  }

  undo() {
    this.battleService.undo();
  }

  getThemes() {
    return THEMES.values();
  }

  randomThemeImage(theme: Theme) {
    return `assets/icons/${theme.name}/${this.randomCharacter}.${theme.imageExtension}`;
  }
}
