import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    public token: string = "apan";

    constructor(
    	private http: HTTP,
	private httpService: HttpService
    )
    {}

    public getToken(username: string, password: string, callbackLoggedIn: Function, callbackNotLoggedIn: Function) {
	let serverAddress = this.httpService.serverAddress;
    	this.http.post(this.httpService.serverAddress + '/api-token-auth/', {
    	    'username': username,
    	    'password': password
    	}, {}).then(request => {
    	    let jsonObj = JSON.parse(request.data);
    	    let token = jsonObj.token;
    	    this.token = token;
	    callbackLoggedIn();
    	}).catch(error => {
    	    console.log(error.status);
    	    console.log(error.error); // error message as string
    	    console.log(error.headers);
	    callbackNotLoggedIn();
    	});
    }
}

