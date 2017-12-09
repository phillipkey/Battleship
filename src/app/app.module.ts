import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ShipComponent } from './ship/ship.component';
import { PlayerComponent } from './player/player.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ShipComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
