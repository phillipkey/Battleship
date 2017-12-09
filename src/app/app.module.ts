import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';
import { ShipService } from './ship.service';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ShipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
