import { ArenaComponent } from './arena/arena.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WinscreenComponent } from './winscreen/winscreen.component';

const routes: Routes = [
  {
    path: '',
    component: ArenaComponent,
  },
  // {
  //   path: 'en/results/:historyEncoding',
  //   redirectTo: 'results/:historyEncoding',
  // },
  // {
  //   path: 'ja/results/:historyEncoding',
  //   redirectTo: 'results/:historyEncoding',
  // },
  {
    path: 'results/:historyEncoding',
    component: WinscreenComponent,
  },
  {
    path: 'g/:historyEncoding',
    component: ArenaComponent,
  }
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
