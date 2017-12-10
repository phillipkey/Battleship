import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';
import { ShipService } from './ship.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayerComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ShipService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
