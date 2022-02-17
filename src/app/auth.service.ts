import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = 'http://localhost:4566/login';


  constructor(private http: HttpClient, private router: Router) { }

  loginUser(credentials: object) {
    console.log(credentials)
    //this.router.navigate(['']);
    return this.http.post<any>(this.loginURL, credentials);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
