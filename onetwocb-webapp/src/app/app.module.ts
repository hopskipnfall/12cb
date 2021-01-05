import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';
import { OnetwocbComponentsModule } from 'onetwocb-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ArenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnetwocbComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
