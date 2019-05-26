import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	public username: string;    
	public token: string;

	constructor(
		private http: HTTP,
		private httpService: HttpService
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
	    	callbackLoggedIn();
    	}).catch(error => {
				console.log(error.status);
				console.log(error.error); // error message as string
				console.log(error.headers);
	    	callbackNotLoggedIn();
    	});
		}

	public validateToken(callbackLoggedIn: Function, callbackNotLoggedIn: Function) {
		console.log("Validates token");
		let token = this.token;
		let serverAddress = this.httpService.serverAddress;
		this.http.get(serverAddress + '/parkinglot/', {}, {
		Authorization: 'Token ' + token
		})
		.then(request => {
			console.log(request.status);
			console.log(request.data); // data received by server
			console.log(request.headers);
			callbackLoggedIn();
		})
		.catch(error => {
			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);
			callbackNotLoggedIn();
		});
	}
}

