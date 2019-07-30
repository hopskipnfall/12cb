import { Component, Inject, LOCALE_ID } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'jyuunikyara';

  readonly LANGUAGE_COOKIE_NAME = 'cookie_override';

  readonly LANGUAGES = [
    {code: 'en', display: 'English'},
    {code: 'ja', display: '日本語'},
  ];
  selectedLanguage: string;

  mobileQuery: MediaQueryList;

  constructor(@Inject(LOCALE_ID) locale: string, private cookieService: CookieService, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

    const languageOverride = cookieService.get(this.LANGUAGE_COOKIE_NAME);
    console.log('languageoverride', languageOverride);
    if (languageOverride && this.LANGUAGES.some(l => l.code === languageOverride)) {
      this.selectedLanguage = languageOverride;
    } else {
      this.selectedLanguage = locale.split('-')[0];
      console.log('language overridden to ', this.selectedLanguage);
    }
  }

  changeLocale(event: MatSelectChange) {
    this.cookieService.set(this.LANGUAGE_COOKIE_NAME, this.selectedLanguage);
    console.log('new value is', this.cookieService.get(this.LANGUAGE_COOKIE_NAME));
    window.location.reload();
  }
}
