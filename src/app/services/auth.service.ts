import { Injectable, ViewChild } from '@angular/core';
import { CONFIG } from '../config/config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { UserData } from '../classes/UserData';
import { NotifyService } from './notify.service';
import { User } from '../interfaces/User';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private router: Router,
    private notifyService: NotifyService,
    private bar: NgProgress
  ) {}

  register(name: string, email: string, password: string): Promise<UserData> {
    return this.http.post(`${CONFIG.API_URL}/register`, { name, email, password })
      .toPromise()
      .then(res => res.json())
      .then((res) => {
        const userData = new UserData(res.token, res.user);
        return userData;
      });
  }

  login(email: string, password: string): Promise<UserData> {
    this.bar.start();
    return this.http.post(`${CONFIG.API_URL}/login`, { email, password })
      .toPromise()
      .then(res => res.json())
      .then((res) => {
        const userData = new UserData(res.token, res.user);
        this.bar.complete();
        return userData;
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  logUserIn(userData: UserData): void {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    this.notifyService.notify('Sucessfully logged in!', 'success');
    this.router.navigate(['/dashboard']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      return true;
    }

    return false;
  }

  getAuthUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  getAuthUserId(): number {
    return this.getAuthUser().id;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

}
