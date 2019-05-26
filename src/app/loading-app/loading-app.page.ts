import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-loading-app',
  templateUrl: './loading-app.page.html',
  styleUrls: ['./loading-app.page.scss'],
})
export class LoadingAppPage implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.validateToken(this.loggedIn.bind(this), this.notLoggedIn.bind(this));
  }

  loggedIn() {
    console.log("Logged in with token: " + this.loginService.token);
    this.router.navigate(['/map'])
  }

  notLoggedIn() {
    console.log("Not logged in.");
    this.router.navigate(['/login'])
  }
}
