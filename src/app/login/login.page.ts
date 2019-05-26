import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  async login() {
    this.loginService.getToken(this.username, this.password, this.loggedIn.bind(this), this.notLoggedIn.bind(this));
  }
  loggedIn() {
    console.log("Logged in with token: " + this.loginService.token);
    this.router.navigate(['/map'])
  }

  notLoggedIn() {
    console.log("Not logged in.");
    alert("Failed logging in!");
  }
}
