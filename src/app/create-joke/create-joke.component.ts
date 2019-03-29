import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JokeService } from '../services/joke.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css']
})
export class CreateJokeComponent implements OnInit {

  public jokeForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private jokeService: JokeService,
      private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.jokeForm = this.formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  onSubmit() {
    this.jokeService.createJoke(this.jokeForm.value)
      .then((res) => {
        this.router.navigate(['/user/profile', this.authService.getAuthUserId()]);
      });
  }

}
