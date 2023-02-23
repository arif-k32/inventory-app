import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from './fake-users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public showMe: boolean = false;

  ngOnInit(): void {}

  public login() {
    const url: string = 'http://127.0.0.1:8000/login';

    const body = this.loginForm.value;

    this.http.post(url, body).subscribe((response) => {
      if (response) {
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  public get controls() {
    return this.loginForm.controls;
  }

  public sayHi() {
    console.log('Hello!');
  }

  ngOnDestroy(): void {
    console.log('My component has been close or destroyed');
  }
}
