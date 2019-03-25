import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const { name, email, password } = form.value;
    this.authService.register(name, email, password)
      .then(userData => this.authService.logUserIn(userData));
  }

}
