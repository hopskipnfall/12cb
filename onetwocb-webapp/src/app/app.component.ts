import { MediaMatcher } from '@angular/cdk/layout';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mobileQuery: MediaQueryList;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    // private cookieService: CookieService,
    media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
  ) // private battleService: BattleService,
  // private themeService: ThemeService
  {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
}
