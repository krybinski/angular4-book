import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { UserData } from '../classes/UserData';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private router: Router
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
    return this.http.post(`${CONFIG.API_URL}/login`, { email, password })
      .toPromise()
      .then(res => res.json())
      .then((res) => {
        const userData = new UserData(res.token, res.user);
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

}
