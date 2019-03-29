import { Component, OnInit } from '@angular/core';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data;

  constructor(
      private jokeService: JokeService
  ) {
    this.getJokes();
  }

  ngOnInit() {}

  getJokes(endPoint = null) {
    this.jokeService.getAllJokes(endPoint)
      .then( res => this.data = res);
  }

  getNextJokes() {
    this.getJokes(this.data.next_page_url);
  }

  getPreviousJokes() {
    this.getJokes(this.data.prev_page_url);
  }

}
