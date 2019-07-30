import { Component, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'jyuunikyara';

  constructor(@Inject(LOCALE_ID) locale: string) {
    console.log(locale);
  }
}
