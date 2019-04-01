import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { JokeService } from '../services/joke.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {

  @Input() joke;
  @Output() jokeDeleted = new EventEmitter();
  editing: boolean = false;
  title: FormControl;
  content: FormControl;

  constructor(
      private authService: AuthService,
      private jokeService: JokeService,
      private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.title = new FormControl(this.joke.title, Validators.required);
    this.content = new FormControl(this.joke.joke, Validators.required);
  }

  canModify(): boolean {
    return this.joke.user.id === this.authService.getAuthUserId();
  }

  edit() {
    this.editing = true;
  }

  cancel() {
    this.title.reset();
    this.content.reset();
    this.editing = false;
  }

  delete() {
    this.jokeService.deleteJoke(+this.joke.id)
      .then((res) => {
        this.jokeDeleted.emit(this.joke.id);
      });
  }

  updateJoke() {
    this.jokeService.updateJoke(+this.joke.id, {
      title: this.title.value,
      content: this.content.value
    }).then(res => {
      this.joke = res;
      this.editing = false;
      this.notifyService.notify('Joke updated!', 'success');
    });
  }

}
