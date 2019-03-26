import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../classes/Message';

@Injectable()
export class NotifyService {

  public newMessageRecived: EventEmitter<Message>;

  constructor() {
    this.newMessageRecived = new EventEmitter();
  }

  notify(message: string, type: string) {
    const newMessage = new Message(message, type);
    this.newMessageRecived.emit(newMessage);
  }

}
