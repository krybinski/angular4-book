import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class JokeService {

  private headers: Headers;

  constructor(
      private http: Http,
      private authService: AuthService
  ) {
    this.headers = new Headers({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  createJoke(joke): Promise<any> {
    const url = `${CONFIG.API_URL}/jokes`;
    const body = { title: joke.title, joke: joke.content };
    const options = new RequestOptions({ headers: this.headers });

    return this.http.post(url, body, options)
      .toPromise()
      .then(res => res.json());
  }

  getAllJokes(endPoint = null) {
    const url = endPoint ? endPoint : `${CONFIG.API_URL}/jokes`;
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get(url, options)
        .toPromise()
        .then(res => res.json());
  }

}
