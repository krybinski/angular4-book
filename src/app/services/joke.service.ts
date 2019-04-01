import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgProgress } from '@ngx-progressbar/core';
import { CONFIG } from '../config/config';
import { AuthService } from './auth.service';

@Injectable()
export class JokeService {

  private headers: Headers;

  constructor(
      private http: Http,
      private authService: AuthService,
      private bar: NgProgress
  ) {
    this.headers = new Headers({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  createJoke(joke): Promise<any> {
    this.bar.start();
    const url = `${CONFIG.API_URL}/jokes`;
    const body = { title: joke.title, joke: joke.content };
    const options = new RequestOptions({ headers: this.headers });

    return this.http.post(url, body, options)
      .toPromise()
      .then((res) => {
        this.bar.complete();
        return res.json();
      });
  }

  getAllJokes(endPoint = null) {
    this.bar.start();
    const url = endPoint ? endPoint : `${CONFIG.API_URL}/jokes`;
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get(url, options)
      .toPromise()
      .then((res) => {
        this.bar.complete();
        return res.json();
      });
  }

  updateJoke(id: number, joke) {
    this.bar.start();
    const url = `${CONFIG.API_URL}/jokes/${id}`;
    const body = { title: joke.title, joke: joke.content };
    const options = new RequestOptions({ headers: this.headers });

    return this.http.put(url, body, options)
      .toPromise()
      .then((res) => {
        this.bar.complete();
        return res.json();
      });
  }

  deleteJoke(id: number) {
    this.bar.start();
    const url = `${CONFIG.API_URL}/jokes/${id}`;
    const options = new RequestOptions({ headers: this.headers });

    return this.http.delete(url, options)
        .toPromise()
        .then((res) => {
          this.bar.complete();
          return res.json();
        });
  }

}
