import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlSegmentGroup, UrlMatchResult } from '@angular/router';
import { CharacterGridComponent } from './character-grid/character-grid.component';
import { SetupComponent } from './setup/setup.component';
import { ArenaComponent } from './arena/arena.component';
import { WinscreenComponent } from './winscreen/winscreen.component';
import { Route } from '@angular/compiler/src/core';

// export function isLanguage(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {
//   return null;
// }

const routes: Routes = [
  {
    path: '',
    component: ArenaComponent,
  },
  {
    path: 'en/results/:historyEncoding',
    redirectTo: 'results/:historyEncoding',
  },
  {
    path: 'ja/results/:historyEncoding',
    redirectTo: 'results/:historyEncoding',
  },
  {
    path: 'results/:historyEncoding',
    component: WinscreenComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
