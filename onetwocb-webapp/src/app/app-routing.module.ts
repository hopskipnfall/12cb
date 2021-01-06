import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaSimpleComponent } from './arena-simple/arena-simple.component';

const routes: Routes = [
  {
    path: '',
    component: ArenaSimpleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
