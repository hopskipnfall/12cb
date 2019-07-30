import { Component, Inject, LOCALE_ID } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'jyuunikyara';

  readonly LANGUAGES = [
    {code: 'en', display: 'English'},
    {code: 'ja', display: '日本語'},
  ];
  selectedLanguage: string;

  mobileQuery: MediaQueryList;

  constructor(@Inject(LOCALE_ID) locale: string, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    console.log(locale);

    this.selectedLanguage = locale.split('-')[0];
  }
}
