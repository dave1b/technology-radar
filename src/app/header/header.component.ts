import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  logoutUser() {
    this.authService.logoutUser();
  }
}