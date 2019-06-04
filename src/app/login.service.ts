import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	public username: string;    
	public token: string;

	constructor(
		private http: HTTP,
		private httpService: HttpService,
		private storage: Storage
	){}

	public getToken(username: string, password: string, callbackLoggedIn: Function, callbackNotLoggedIn: Function) {
		let serverAddress = this.httpService.serverAddress;
    	this.http.post(this.httpService.serverAddress + '-token-auth/', {
				'username': username,
				'password': password
    	}, {}).then(request => {
				let jsonObj = JSON.parse(request.data);
				let token = jsonObj.token;
				this.token = token;
				this.username = username;
				this.storage.set('username', this.username);
				this.storage.set('token', this.token);
	    	callbackLoggedIn();
    	}).catch(error => {
				console.log(error.status);
				console.log(error.error);
				console.log(error.headers);
	    	callbackNotLoggedIn();
    	});
		}

	public validateToken(callbackLoggedIn: Function, callbackNotLoggedIn: Function) {
		console.log("Validates token");
		this.storage.get('token').then((token) => {
			console.log(token);
			this.token = token;
			let serverAddress = this.httpService.serverAddress;
			this.http.get(serverAddress + '/getusername/', {}, {
				Authorization: 'Token ' + token
			})
			.then(request => {
				console.log(request.status);
				console.log(request.data);
				console.log(request.headers);
				callbackLoggedIn();
			})
			.catch(error => {
				console.log(error.status);
				console.log(error.error);
				console.log(error.headers);
				callbackNotLoggedIn();
			});
		}).catch(error => {
			console.log(error);
			console.log("Could not get token from storage.");
			callbackNotLoggedIn();
		});
	}
}

