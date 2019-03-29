import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';
import { CONFIG } from '../config/config';
import { User } from '../interfaces/User';

@Injectable()
export class UserService {

  public userProfileUpdated: EventEmitter<User>;
  private headers: Headers;

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
    this.userProfileUpdated = new EventEmitter();
    this.headers = new Headers({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getUserById(id: number): Promise<User> {
    if (id === this.authService.getAuthUserId()) {
      return Promise.resolve(this.authService.getAuthUser());
    }

    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(`${CONFIG.API_URL}/users/${id}`, options)
      .toPromise()
      .then(res => res.json());
  }

  updateProfile(id: number, name: string, email: string): Promise<User> {
    const body = { id, name, email };
    const options = { headers: this.headers };

    return this.http.put(`${CONFIG.API_URL}/users`, body, options)
      .toPromise()
      .then(res => res.json())
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userProfileUpdated.emit(user);
        return user;
      });
  }

  getUserWall(id: number) {
    const url = `${CONFIG.API_URL}/profile/${id}/wall`;
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get(url, options)
        .toPromise()
        .then(res => res.json());
  }

}
