import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  errorMessage?: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      pwd: ['', Validators.required],
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    var email = this.loginForm.value.email;
    var pwd = this.loginForm.value.pwd;
    this.authService.loginUser({ email: email, pwd: pwd }).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
      },
      (err) => {
        this.errorMessage = err.error;
      }
    );
  }

  get getControl() {
    return this.loginForm!.controls;
  }
}
