import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArenaComponent } from './arena/arena.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CharacterComponent } from './character/character.component';
import { CharacterGridComponent, NameEditDialogComponent } from './character-grid/character-grid.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SetupComponent } from './setup/setup.component';
import { StockSelectorComponent } from './stock-selector/stock-selector.component';
import { WinscreenComponent } from './winscreen/winscreen.component';
import { OnetwocbComponentsModule } from 'onetwocb-components';

@NgModule({
  declarations: [
    AppComponent,
    ArenaComponent,
    CharacterComponent,
    CharacterGridComponent,
    SetupComponent,
    StockSelectorComponent,
    WinscreenComponent,
    NameEditDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    // OnetwocbComponentsModule,
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [NameEditDialogComponent],
})
export class AppModule { }
