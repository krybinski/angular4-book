import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login(email, password)
      .then(userData => this.authService.logUserIn(userData))
      .catch((err) => {
        console.log(err.message);
        this.notifyService.notify('Authentication error', 'error');
      });
  }

}
