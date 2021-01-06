import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnetwocbComponentsModule } from 'onetwocb-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArenaSimpleComponent } from './arena-simple/arena-simple.component';
import { ArenaComponent } from './arena/arena.component';

@NgModule({
  declarations: [AppComponent, ArenaComponent, ArenaSimpleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnetwocbComponentsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
