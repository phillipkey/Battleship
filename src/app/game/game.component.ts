import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  isSetupMode: boolean = true; //flag for set up mode
  constructor() { }

  ngOnInit() {
  }

}
