import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterGridComponent } from './character-grid/character-grid.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: SetupComponent,
  },
  {
    path: 'battle',
    component: CharacterGridComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }