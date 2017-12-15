import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ShipService } from './ship.service';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message.service';
import { GameComponent } from './game/game.component';
import { GameService } from './game.service';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MessageComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ShipService, MessageService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
