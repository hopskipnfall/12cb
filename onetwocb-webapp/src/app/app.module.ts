import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnetwocbComponentsModule } from 'onetwocb-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';

@NgModule({
  declarations: [AppComponent, ArenaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnetwocbComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
