import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {NgProgress} from '@ngx-progressbar/core';
import {NotifyService} from './notify.service';
import {CONFIG} from '../config/config';
import {AuthService} from './auth.service';

@Injectable()
export class FollowService {

  private headers: Headers;

  constructor(
      private http: Http,
      private notifyService: NotifyService,
      private authService: AuthService,
      private bar: NgProgress
  ) {
    this.headers = new Headers({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  follow(id: number) {
    this.bar.start();
    const url = `${CONFIG.API_URL}/user/follow`;
    const body = { user_to_follow_id: id };
    const options = new RequestOptions({ headers: this.headers });

    return this.http.post(url, body, options)
        .toPromise()
        .then((res) => {
          this.bar.complete();
          return res.json();
        });
  }

  unfollow(id: number) {
    this.bar.start();
    const url = `${CONFIG.API_URL}/user/unfollow`;
    const body = { user_to_unfollow_id: id };
    const options = new RequestOptions({ headers: this.headers });

    return this.http.post(url, body, options)
        .toPromise()
        .then((res) => {
          this.bar.complete();
          return res.json();
        });
  }

  isFollowing(id: number): Promise<boolean> {
    const url = `${CONFIG.API_URL}/user/is/following`;
    const body = { user_to_check_if_is_following_id: id };
    const options = new RequestOptions({ headers: this.headers });

    return this.http.post(url, body, options)
        .toPromise()
        .then(res => res.json().following);
  }

}
