import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    ToastController,
    Platform,
    LoadingController
} from '@ionic/angular';

import { HTTP } from '@ionic-native/http/ngx';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(
	private platform: Platform,
	private router: Router,
	private http: HTTP,
	private loginService: LoginService) {
    }

    async ngOnInit() {
	await this.platform.ready();
	this.loginService.getToken('admin', 'admin', this.loggedIn.bind(this), this.notLoggedIn.bind(this));
    }

    loggedIn() {
	console.log("Logged in with token: " + this.loginService.token);
	this.router.navigate(['/map'])
    }

    notLoggedIn() {
	console.log("Not logged in.");
    }
}
