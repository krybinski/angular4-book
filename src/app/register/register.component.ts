import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const { name, email, password } = form.value;
    this.authService.register(name, email, password)
      .then(userData => this.authService.logUserIn(userData))
      .catch((err) => {
        console.log(err.message);
        this.notifyService.notify('Register error', 'error');
      });
  }

}
