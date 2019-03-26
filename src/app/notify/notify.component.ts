import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { Message } from '../classes/Message';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  message: Message;

  constructor(
    private notifyService: NotifyService
  ) {
    this.notifyService.newMessageRecived
      .subscribe(message => this.newMessageRecived(message));
  }

  ngOnInit() {
  }

  newMessageRecived(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message = new Message('', '');
    }, 2000);
  }

}
