import 'hammerjs';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// const translations = require(`raw-loader!./locale/messages.ja.xlf`);

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    // {provide: TRANSLATIONS, useValue: translations},
    // {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    {provide: LOCALE_ID, useValue: 'en-US' },
  ],
  missingTranslation: MissingTranslationStrategy.Warning,
})
  .catch(err => console.error(err));
