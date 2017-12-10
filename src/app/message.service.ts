import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }

  messages: string[] = [];
  
   add(message: string) {
     this.messages.unshift(message);
   }
  
   clear() {
     this.messages = [];
   }

}
